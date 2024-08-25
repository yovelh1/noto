import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

import styleReducer from "./Reducers/styleSlice";
import userReducer from "./Reducers/userSlice";

import {productApi} from "./Services/productApi";
import {authApi} from "./Services/authApi";
import {userApi, rtkQueryError} from "./Services/userApi";

export const store = configureStore({
	reducer: {
		style: styleReducer,
		user: userReducer,
		[productApi.reducerPath]: productApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware, authApi.middleware, userApi.middleware, rtkQueryError),
});

setupListeners(store.dispatch);
