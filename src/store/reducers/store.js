// fichier contenant toutes les configurations pour react redux
// ensuite il faut aller rendre le store disponible dans toute l'application au niveau du fichier main.jsx
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {},
    preloadedState: {},
});

export default store;