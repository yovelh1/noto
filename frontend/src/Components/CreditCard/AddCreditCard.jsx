import {useRef, useState, useReducer} from "react";
import "./AddCreditCard.css";

import {useNavigate} from "react-router-dom";
import {useUpdateUserMutation} from "../../Redux/Services/userApi";

import {ReactComponent as BackIcon} from "../../Assets/icons/back_icon.svg";
import visa from "../../Assets/images/visa.png";
import musterCard from "../../Assets/images/muster_card.png";

const initialState = {
	number: "",
	date: "",
	cvv: "",
	default: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "updateState":
			return {...state, ...action.payload};
		case "initState":
			return initialState;
		default:
			console.error("error in addCard reducer");
	}
};

export default function AddCreditCard({showErr}) {
	const navigate = useNavigate();
	const cardRef = useRef(null);
	const idRef = useRef(null);
	const dateRef = useRef(null);
	const cvvRef = useRef(null);
	const [inputState, inputDispatch] = useReducer(reducer, initialState);
	const [showInputCard, setShowInputCard] = useState(false);
	const [updateUser] = useUpdateUserMutation();

	const handleCardIDChange = (e) => {
		var v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		var matches = v.match(/\d{4,16}/g);
		var match = (matches && matches[0]) || "";
		var parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		parts[0] == "4580"
			? inputDispatch({type: "updateState", payload: {company: "visa"}})
			: inputDispatch({type: "updateState", payload: {company: ""}});

		parts.length > 0
			? inputDispatch({type: "updateState", payload: {number: parts.join(" ")}})
			: inputDispatch({type: "updateState", payload: {number: v}});
		parts[3]?.length === 4 && dateRef.current.focus();
	};
	const handleDateChange = (e) => {
		var v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		var matches = v.match(/\d{2,4}/g);
		var match = (matches && matches[0]) || "";
		var parts = [];
		for (let i = 0, len = match.length; i < len; i += 2) {
			parts.push(match.substring(i, i + 2));
		}
		parts.length === 0 && v === "" && idRef.current.focus();
		parts.length > 0
			? inputDispatch({type: "updateState", payload: {date: parts.join("/")}})
			: inputDispatch({type: "updateState", payload: {date: v}});
		parts[1]?.length === 2 &&
			setTimeout(() => {
				cardRef.current.classList.add("add-credit-card__show-back");
				cvvRef.current.focus();
			}, 700);
	};
	const handleCVVChange = (e) => {
		var v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		var matches = v.match(/\d{3}/g);
		matches?.length > 0 ? inputDispatch({type: "updateState", payload: {cvv: matches[0]}}) : inputDispatch({type: "updateState", payload: {cvv: v}});
	};

	const handleBack = () => {
		cardRef.current.classList.remove("add-credit-card__show-back");
	};

	//check if new credit card is valid than add to state
	const handleAddCard = () => {
		if (!showInputCard) setShowInputCard(true);
		else {
			updateUser({url: "update-cards", headers: {method: "ADD"}, body: inputState})
				.unwrap()
				.then(() => {
					setShowInputCard(false);
					inputDispatch({type: "initState"});
				})
				.catch(({data}) => {
					if (data.authErr) {
						navigate("/login");
					} else if (data.inputsError) {
						if (Object.keys(data.inputsError).join().includes("company") && Object.keys(data.inputsError).join().includes("number")) {
							Object.keys(data.inputsError).forEach((key) => {
								if (key.includes("number")) showErr(data.inputsError[key].message);
							});
						} else showErr(data.inputsError[Object.keys(data.inputsError)[0]].message || data.generalError);
					}
				});
		}
	};

	return (
		<div className="add-credit-card">
			{showInputCard && (
				<div className="add-credit-card__container">
					<div className="add-credit-card__inner" ref={cardRef}>
						<div className="add-credit-card__front">
							<div className="add-credit-card__front-inner">
								<input
									className="add-credit-card__id"
									type="text"
									placeholder="1234 4567 7891 123"
									ref={idRef}
									value={inputState.number}
									onChange={(e) => handleCardIDChange(e)}
								/>
								<div className="add-credit-card__line">
									<input
										className="add-credit-card__date"
										type="text"
										placeholder="MM/YY"
										ref={dateRef}
										value={inputState.date}
										onChange={(e) => handleDateChange(e)}
									/>
								</div>
							</div>
							<div className="add-credit-card__img-container">
								{inputState.company === "visa" && <img src={visa} />}
								{inputState.company === "musterCard" && <img src={musterCard} />}
							</div>
						</div>

						<div className="add-credit-card__back">
							<button onClick={handleBack}>
								<BackIcon />
							</button>
							<div className="add-credit-card__black-line"></div>
							<input
								className="add-credit-card__cvv"
								type="text"
								ref={cvvRef}
								placeholder="CVV"
								value={inputState.cvv}
								onChange={(e) => handleCVVChange(e)}
							/>
						</div>
					</div>
				</div>
			)}
			<button className="primary-button" onClick={handleAddCard}>
				Add
			</button>
		</div>
	);
}
