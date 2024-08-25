import React from "react";
import "./BottomNav.css";

import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeCartDisplay, changeWishlistDisplay} from "../../Redux/Reducers/styleSlice";

import {ReactComponent as Orders_icon} from "../../Assets/icons/orders_icon.svg";
import {ReactComponent as Cart_icon} from "../../Assets/icons/cart_icon.svg";
import {ReactComponent as Whishlist_icon} from "../../Assets/icons/wishlist_icon.svg";

import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

export default function BottomNav() {
	const dispatch = useDispatch();
	const styleState = useSelector((state) => state.style);

	return (
		<div className="bottom-nav">
			<Link to="/orders">
				<Orders_icon />
			</Link>
			<div className="bottom-nav__button-container">
				<button
					onClick={() => {
						dispatch(changeCartDisplay(!styleState.cart.isOpen));
					}}>
					<Cart_icon />
				</button>
				{styleState.cart.isOpen && <Cart />}
			</div>
			<div className="bottom-nav__button-container">
				<button
					onClick={() => {
						dispatch(changeWishlistDisplay(!styleState.wishlist.isOpen));
					}}>
					<Whishlist_icon />
				</button>
				{styleState.wishlist.isOpen && <Wishlist />}
			</div>
		</div>
	);
}
