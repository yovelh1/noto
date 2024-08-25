import React from "react";
import "./CartItem.css";

import {Link, useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useUpdateUserMutation, userApi} from "../../Redux/Services/userApi";
import {changeWishlistDisplay, changeCartDisplay} from "../../Redux/Reducers/styleSlice";

import {ReactComponent as EditIcon} from "../../Assets/icons/edit_icon.svg";
import {ReactComponent as DeleteIcon} from "../../Assets/icons/delete_icon.svg";

export default function CartItem({item}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {data} = userApi.endpoints.getUser.useQueryState();
	const [updateUser] = useUpdateUserMutation();

	const handleRemoveItem = () => {
		if (data) {
			updateUser({url: "update-cart", headers: {method: "DELETE"}, body: {_id: item._id}}).catch(({data}) => {
				if (data.authErr) navigate("/login");
			});
		}
	};

	const handleSaveForlater = () => {
		if (data) {
			updateUser({url: "update-wishlist", headers: {method: "ADD"}, body: item})
				.unwrap()
				.then(() => {
					handleRemoveItem();
					dispatch(changeWishlistDisplay(true));
				})
				.catch(({data}) => {
					if (data.authErr) {
						dispatch(changeCartDisplay(false));
						navigate("/login");
					}
				});
		}
	};

	return (
		<div className="cart-item">
			<div className="cart-item__line">
				<img src={item.img} />
				<h4>{item.title}</h4>
				<div>
					<Link to={`/item/${item._id.split("/")[0]}?color=${item.color}&size=${item.size}&qty=${item.qty}`}>
						<EditIcon />
					</Link>
					<button onClick={handleRemoveItem}>
						<DeleteIcon />
					</button>
				</div>
			</div>
			<div className="cart-item__line">
				<div>
					<span>{item.size}</span>|<span>{item.color}</span>|<span>X{item.qty}</span>
				</div>
				<span>{item.price}$</span>
			</div>

			<div className="cart-item__line">
				<button onClick={handleSaveForlater}>Save for later</button>
			</div>
		</div>
	);
}
