// fichier contenant toute la configuration pour le custom API object

import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
});

export default api