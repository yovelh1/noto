import React from "react";
import "./AddressItem.css";

import {useNavigate} from "react-router-dom";
import {useUpdateUserMutation} from "../../Redux/Services/userApi";

import {ReactComponent as EditIcon} from "../../Assets/icons/edit_icon.svg";
import {ReactComponent as DeleteIcon} from "../../Assets/icons/delete_icon.svg";

export default function AddressItem({item, handleEditAddress, showErr}) {
	const navigate = useNavigate();
	const [updateUser] = useUpdateUserMutation();

	//send remove requset for an address and update state
	const handleRemoveAddress = (_id) => {
		updateUser({url: "update-address", headers: {method: "DELETE"}, body: {_id: _id}})
			.unwrap()
			.catch(({data}) => {
				if (data.authErr) {
					navigate("/login");
				} else {
					showErr();
				}
			});
	};

	//update selected address to be default address
	const handleDefaultAddress = (_id) => {
		updateUser({url: "update-address", headers: {method: "SET_DEFAULT"}, body: {_id: _id}})
			.unwrap()
			.catch(({data}) => {
				if (data.authErr) {
					navigate("/login");
				} else {
					showErr();
				}
			});
	};

	return (
		<div className={JSON.parse(item.default) ? "address-item address-item__selected" : "address-item"}>
			<div className="address-item__left-side">
				<h4>{item.addressName}</h4>
				<p>
					{item.street}, {item.city}.<br /> Zip Code: {item.zipCode}
				</p>
			</div>
			<div className="address-item__right-side">
				<div>
					<button onClick={() => handleEditAddress(item)}>
						<EditIcon />
					</button>
					{!item.default && (
						<button onClick={() => handleRemoveAddress(item._id)}>
							<DeleteIcon />
						</button>
					)}
				</div>
				<input type="radio" checked={JSON.parse(item.default)} onChange={() => handleDefaultAddress(item._id)} />
			</div>
		</div>
	);
}
