import {useState} from "react";
import "./CreditCard.css";

import {userApi} from "../../Redux/Services/userApi";

import CreditCardItem from "./CreditCardItem";
import AddCreditCard from "./AddCreditCard";
import ErrAlert from "../ErrAlert";

export default function CreditCard() {
	const {data} = userApi.endpoints.getUser.useQueryState();
	const [errMssg, setErrMssg] = useState("");

	const showErr = (text) => {
		setErrMssg(text);
		setTimeout(() => setErrMssg(""), 3000);
	};

	return (
		<div className="credit-card">
			{data?.cards?.length > 0 ? (
				<div className="credit-card__cards-container">
					{data?.cards?.map((item, i) => (
						<CreditCardItem key={i} item={item} showErr={showErr} />
					))}
				</div>
			) : (
				<div className="credit-card__no-cards">
					<strong>NO ADDRESS</strong>
				</div>
			)}
			<AddCreditCard showErr={showErr} />
			{errMssg !== "" && <ErrAlert text={errMssg} />}
		</div>
	);
}
