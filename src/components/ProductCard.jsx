import {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import ProductViewModal from "./ProductViewModal.jsx";

const ProductCard = ({
                         id: productId,
                         productName,
                         image,
                         description,
                         quantity,
                         price,
                         discount,
                         specialPrice,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false); // pour afficher le modal des details d'un produit
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState(""); // selectedViewProduct determinera les details du produits que la modal affiche
    const isAvailable = quantity && Number(quantity) > 0 ; // pour savoir si le produit est disponible basé sur la quantité

    {/**
     Si il y a un clic sur le produit, on affiche la modal et met la variable selectedViewProduct au produit qui a été cliqué
     pour suivre le produit qui été cliqué
     **/}
    const handleProductView = (product) => {
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    }

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView(
                    {
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice
                    }
                )}
            }
                 className="w-full overflow-hidden aspect-3/2"
            >
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105" src={image} alt={productName} />
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                    handleProductView(
                        {
                            id: productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice
                        }
                    )}
                }
                    className="text-lg font-semibold mb-2 cursor-pointer"
                >
                    {productName}
                </h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>

                <div className="flex items-center justify-between">
                    {specialPrice ? (
                        <div className="flex flex-col">
                        <span className="text-gray-400 line-through">
                            ${Number(price).toFixed(2)}
                        </span>

                            <span className="text-xl font-bold text-slate-700">
                            ${Number(specialPrice).toFixed(2)}
                        </span>
                        </div>

                    ) : (
                        <span className="text-xl font-bold text-slate-700">
                            {" "} {/** Parce que dans le if, on affiche deux nombres, ici on met une ligne vide pour équilibrer **/}
                            ${Number(price).toFixed(2)}
                        </span>
                    )}

                    <button
                        disabled={!isAvailable || btnLoader}
                        onClick={() => {}}
                        className={`
                        bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"} 
                        text-white px-3 py-2 rounded-lg items-center transition-colors duration-300  w-36 flex justify-center
                    `}>
                        <FaShoppingCart className="mr-2" /> {/** Icône pour ajouter au panier **/}
                        {isAvailable ? "Add to cart" : "Stock out"}
                    </button>
                </div>
            </div>
            <ProductViewModal
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard