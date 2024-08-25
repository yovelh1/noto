import React from "react";
import "./CreditCardItem.css";

import {useNavigate} from "react-router-dom";

import {useUpdateUserMutation} from "../../Redux/Services/userApi";

import {ReactComponent as DeleteIcon} from "../../Assets/icons/delete_icon.svg";
import visa from "../../Assets/images/visa.png";
import musterCard from "../../Assets/images/muster_card.png";

export default function CreditCardItem({item, showErr}) {
	const navigate = useNavigate();
	const [updateUser] = useUpdateUserMutation();

	//update selected card to be default card
	const handleDefaultCard = (_id) => {
		updateUser({url: "update-cards", headers: {method: "SET_DEFAULT"}, body: {_id: _id}})
			.unwrap()
			.catch(({data}) => {
				if (data.authErr) {
					navigate("/login");
				} else if (data.generalError) {
					showErr("something went wrong try agin later");
				}
			});
	};

	//send remove requset for a card and update state
	const handleRemoveCard = (_id) => {
		updateUser({url: "update-cards", headers: {method: "DELETE"}, body: {_id: _id}})
			.unwrap()
			.catch(({data}) => {
				if (data.authErr) {
					navigate("/login");
				} else if (data.generalError) {
					showErr("something went wrong try agin later");
				}
			});
	};

	return (
		<div className={item.default ? "credit-card-item credit-card-item__selected" : "credit-card-item"}>
			<div className="credit-card-item__line">
				{item.company == "musterCard" && <img src={musterCard} />}
				{item.company == "visa" && <img src={visa} />}
				{!item.default && (
					<button
						onClick={() => {
							handleRemoveCard(item._id);
						}}>
						<DeleteIcon />
					</button>
				)}
			</div>
			<div className="credit-card-item__line">
				<span className="credit-card-item__number">{item?.number}</span>
				<input type="radio" checked={item.default} onChange={() => handleDefaultCard(item._id)} />
			</div>
			<div className="credit-card-item__line">
				<span>{item?.company}</span>
				<span>{item?.date}</span>
			</div>
		</div>
	);
}
