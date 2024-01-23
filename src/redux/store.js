import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key :'root',
    storage
}

const persistantAuthReducer = persistReducer(persistConfig, authReducer)
export const store= configureStore({
    reducer: {
        auth: persistantAuthReducer
    }
})