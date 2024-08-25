import {createSlice} from "@reduxjs/toolkit";

export const styleSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser: (state, {payload}) => {
			state.data = {...state, ...payload};
		},
		deleteUser: (state) => {
			state.data = {};
		},
		addToCart: (state, {payload: {wishlist, data}}) => {
			const key = wishlist ? "wishlist" : "cart";
			state.data[key] = state.data[key].push(data);
		},
		deleteFromCart: (state, {payload: {wishlist, data}}) => {
			const key = wishlist ? "wishlist" : "cart";
			state.data[key] = state.data[key].filter((item) => item.productID !== data.productID && item.color !== data.color);
		},
	},
});

export const {setUser, deleteUser, addToCart, deleteFromCart} = styleSlice.actions;
export default styleSlice.reducer;
