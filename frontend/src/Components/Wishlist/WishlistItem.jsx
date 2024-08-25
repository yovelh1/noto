import React from "react";
import "./WishlistItem.css";

import {useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useUpdateUserMutation, userApi} from "../../Redux/Services/userApi";
import {changeCartDisplay, changeWishlistDisplay} from "../../Redux/Reducers/styleSlice";

import {ReactComponent as DeleteIcon} from "../../Assets/icons/delete_icon.svg";

export default function WishlistItem({item}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {data} = userApi.endpoints.getUser.useQueryState();
	const [updateUser] = useUpdateUserMutation();

	const handleRemoveFromWishlist = () => {
		if (data) {
			updateUser({url: "update-wishlist", headers: {method: "DELETE"}, body: {_id: item._id}}).catch(({data}) => {
				if (data.authErr) navigate("/login");
			});
		}
	};

	const handleAddToCart = () => {
		if (data) {
			updateUser({url: "update-cart", headers: {method: "ADD"}, body: item})
				.unwrap()
				.then(() => {
					handleRemoveFromWishlist();
					dispatch(changeCartDisplay(true));
				})
				.catch(({data}) => {
					if (data.authErr) {
						dispatch(changeWishlistDisplay(false));
						navigate("/login");
					}
				});
		}
	};

	return (
		<div className="wishlist-item">
			<div className="wishlist-item__line">
				<img src={item.img} />
				<h4>{item.title}</h4>
				<div>
					<button onClick={handleRemoveFromWishlist}>
						<DeleteIcon />
					</button>
				</div>
			</div>
			<div className="wishlist-item__line">
				<div>
					<span>{item.size}</span>|<span>{item.color}</span>|<span>X{item.qty}</span>
				</div>
				<span>{item.price}</span>
			</div>
			<div className="wishlist-item__line">
				<button className="primary-button" onClick={handleAddToCart}>
					Add to cart
				</button>
			</div>
		</div>
	);
}
