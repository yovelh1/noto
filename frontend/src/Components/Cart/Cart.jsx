import {useRef, useImperativeHandle, forwardRef} from "react";
import "./Cart.css";

import {Link} from "react-router-dom";

import {useDispatch} from "react-redux";
import {changeCartDisplay} from "../../Redux/Reducers/styleSlice";
import {userApi} from "../../Redux/Services/userApi";

import {ReactComponent as BackIcon} from "../../Assets/icons/back_icon.svg";

import useIsMobile from "../../Hooks/useIsMobile";

import CartItem from "./CartItem";

export default forwardRef(function Cart(props, ref) {
	const cartRef = useRef(null);
	const isMobile = useIsMobile();
	const dispatch = useDispatch();
	const {data} = userApi.endpoints.getUser.useQueryState();

	useImperativeHandle(ref, () => ({
		handleClickOutSide: (e) => {
			if (!cartRef.current?.contains(e.target)) return true;
			else return false;
		},
	}));

	return (
		<div className="cart" ref={cartRef}>
			{isMobile && (
				<button className="cart__back-button" onClick={() => dispatch(changeCartDisplay(false))}>
					<BackIcon />
				</button>
			)}
			{data?.cartItems?.items.length > 0 ? (
				<>
					<div className="cart__items">
						{data?.cartItems?.items.map((el, i) => {
							return <CartItem key={i} item={el} />;
						})}
					</div>
					<Link to="/payment" onClick={() => dispatch(changeCartDisplay(false))}>
						<span className="cart__pay-button">pay</span>
					</Link>
				</>
			) : (
				<div className="cart__no-items">
					<strong>NO ITEMS IN CART</strong>
				</div>
			)}
		</div>
	);
});
