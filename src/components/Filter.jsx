// fichier contenant l'interface qui va représenter le filtre

import {useEffect, useState} from "react";
import {FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch} from "react-icons/fi";
import {FormControl, InputLabel, MenuItem, Select, Tooltip, Button} from "@mui/material";
import {useSearchParams, useNavigate, useLocation} from "react-router-dom";

const Filter = ({ categories }) => {

    const [searchParams] = useSearchParams(); // permet de lire et de mettre à jour le paramètre de requête de l'url
    const params = new URLSearchParams(searchParams); // URLSearchParams est une interface qui vous permet de definir et de manipuler facilement
                                                                        // les parametres de la requête
    const pathName =  useLocation().pathname; // fournit des infos sur l'url actuelle y compris le chemin
    const navigate = useNavigate(); // permet de naviguer vers une autre url

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSearchOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSearchOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathName}?${searchParams.toString()}`);
        }, 700)

        return () => clearTimeout(handler);
    }, [searchParams, searchTerm, navigate, pathName])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathName}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathName}?${params}`);
            return newOrder;
        });
    }

    const handleClearFilters = () => {
        navigate({ pathname: window.location.pathname });
    }

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* SEARCH BAR */ }
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[450px] w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Products"
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                />
                <FiSearch className="absolute left-3 text-slate-800 size={20}" />
            </div>

            {/* CATEGORY SELECTION */ }
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl className="text-slate-800 border-slate-700" variant="outlined" size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select className="min-w-[120px] text-slate-800 border-slate-700" labelId="category-select-label" value={category} onChange={handleCategoryChange} label="Category">
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BUTTON & CLEAR FILTER */ }
                <Tooltip title="Sorted by price: asc">
                    <Button
                        onClick={toggleSortOrder}
                        variant="contained"
                        color="primary"
                        className="flex items-center gap-2 h-10"
                    >
                        Sort By
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={20} />
                        ) : (
                            <FiArrowDown size={20} />
                        )}

                    </Button>
                </Tooltip>
                <button
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                    onClick={handleClearFilters}
                >
                    <FiRefreshCw className="font-semibold" size={16} />
                    <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;