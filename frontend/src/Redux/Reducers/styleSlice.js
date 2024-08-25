import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	cart: {isOpen: false},
	wishlist: {isOpen: false},
};

export const styleSlice = createSlice({
	name: "style",
	initialState,
	reducers: {
		changeCartDisplay: (state, action) => {
			state.wishlist = {isOpen: false};
			state.cart = {isOpen: action.payload};
		},
		changeWishlistDisplay: (state, action) => {
			state.cart = {isOpen: false};
			state.wishlist = {isOpen: action.payload};
		},
	},
});

export const {changeCartDisplay, changeWishlistDisplay} = styleSlice.actions;
export default styleSlice.reducer;
