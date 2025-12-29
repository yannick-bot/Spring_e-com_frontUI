// fichier contenant toutes les configurations pour react redux
// ensuite il faut aller rendre le store disponible dans toute l'application au niveau du fichier main.jsx
import {configureStore} from '@reduxjs/toolkit'
import {productReducer} from "./ProductReducer.js";
import {errorReducer} from "./ErrorReducer.js";

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer
    },
    preloadedState: {},
});

export default store;