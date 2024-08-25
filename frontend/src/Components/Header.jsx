import {useEffect, useRef} from "react";
import "./Header.css";

import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeCartDisplay, changeWishlistDisplay} from "../Redux/Reducers/styleSlice";
import {userApi} from "../Redux/Services/userApi";

import {ReactComponent as Orders_icon} from "../Assets/icons/orders_icon.svg";
import {ReactComponent as Cart_icon} from "../Assets/icons/cart_icon.svg";
import {ReactComponent as Whishlist_icon} from "../Assets/icons/wishlist_icon.svg";
import {ReactComponent as Avatar_icon} from "../Assets/icons/avatar_icon.svg";

import useIsMobile from "../Hooks/useIsMobile";

import Cart from "../Components/Cart/Cart";
import Wishlist from "../Components/Wishlist/Wishlist";

export default function Header() {
	const isMobile = useIsMobile();
	const styleState = useSelector((state) => state.style);
	const dispatch = useDispatch();
	const cartRef = useRef(null);
	const wishlistRef = useRef(null);
	const {data} = userApi.endpoints.getUser.useQueryState();

	useEffect(() => {
		document.addEventListener(
			"click",
			(e) => {
				cartRef.current?.handleClickOutSide(e) && dispatch(changeCartDisplay(false));
				wishlistRef.current?.handleClickOutSide(e) && dispatch(changeWishlistDisplay(false));
			},
			true,
		);
	}, []);

	return (
		<header className="Header">
			<div className="Header__left-side Header__side-container">
				<Link to="/">
					<h1 className="Header__logo">NOTO</h1>
				</Link>
			</div>
			<div className="Header__right-side  Header__side-container">
				{!isMobile && (
					<>
						<Link to="/orders" className="Header__button-container">
							<Orders_icon />
						</Link>
						<div className="Header__button-container">
							<button
								onClick={() => {
									dispatch(changeCartDisplay(!styleState.cart.isOpen));
								}}>
								<Cart_icon />
							</button>
							{styleState.cart.isOpen && <Cart ref={cartRef} />}
						</div>
						<div className="Header__button-container">
							<button
								onClick={() => {
									dispatch(changeWishlistDisplay(!styleState.wishlist.isOpen));
								}}>
								<Whishlist_icon />
							</button>
							{styleState.wishlist.isOpen && <Wishlist ref={wishlistRef} />}
						</div>
					</>
				)}

				<Link to={data ? "/setting" : "/login"}>
					<div className="Header__setting-container">
						<div className="Header__setting">
							<Avatar_icon />
						</div>
					</div>
				</Link>
			</div>
		</header>
	);
}
