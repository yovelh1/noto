import {useState, useReducer, useRef, useImperativeHandle, forwardRef} from "react";
import "./ContactUsCard.css";
import {ReactComponent as Close_icon} from "../../Assets/icons/close_icon.svg";
import Input from "../../Components/Input";
import SuccessAlert from "../../Components/SuccessAlert";

const initialState = {
	fullNameInput: {val: "", errText: "", trhowErr: false},
	emailInput: {val: "", errText: "", trhowErr: false},
	descriptionInput: {val: "", errText: "", trhowErr: false},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "updateState":
			return {...state, ...action.payload};
		case "initState":
			return initialState;
		case "hideErrors":
			return {
				...state,
				fullNameInput: {...state.fullNameInput, trhowErr: false},
				emailInput: {...state.emailInput, trhowErr: false},
				descriptionInput: {...state.descriptionInput, trhowErr: false},
			};
		default:
			console.error("error in contant-us inputs reducer");
	}
};

function ContactUsCard({id, title, description, buttonText, openCard, closeCards, position}, ref) {
	const cardRef = useRef(null);
	const [isExtend, setIsExtend] = useState(false);
	const [success, setSuccess] = useState(null);
	const [inputState, inputDispatch] = useReducer(reducer, initialState);

	useImperativeHandle(ref, () => ({
		addExtend() {
			cardRef.current.classList.add("contact-us-card__extend");
			setIsExtend(true);
		},
		removeExtend() {
			cardRef.current.classList.remove("contact-us-card__extend");
			setIsExtend(false);
		},
	}));

	const handleSend = () => {
		if (!isExtend) openCard(id);
		else {
			inputDispatch({type: "hideErrors"});
			if (
				inputState.fullNameInput.val == "" ||
				inputState.emailInput.val.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				) == null ||
				inputState.descriptionInput.val == ""
			) {
				if (inputState.fullNameInput.val == "")
					inputDispatch({type: "updateState", payload: {fullNameInput: {...inputState.fullNameInput, trhowErr: true}}});
				if (
					inputState.emailInput.val.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					) == null
				)
					inputDispatch({type: "updateState", payload: {emailInput: {...inputState.emailInput, trhowErr: true}}});
				if (inputState.descriptionInput.val == "")
					inputDispatch({type: "updateState", payload: {descriptionInput: {...inputState.descriptionInput, trhowErr: true}}});
			} else {
				setSuccess(true);
				setTimeout(() => {
					inputDispatch({type: "initState"});
					setSuccess(false);
					cardRef.current.classList.remove("contact-us-card__extend");
					setIsExtend(false);
				}, 2000);
			}
		}
	};

	return (
		<div className={"contact-us-card contact-us-card__" + position} ref={cardRef}>
			{isExtend && (
				<button className="contact-us-card__close-button" onClick={() => closeCards()}>
					<Close_icon />
				</button>
			)}
			<h2 className="contact-us-card__title">{title}</h2>
			<h4 className="contact-us-card__description">{description}</h4>
			{isExtend && (
				<div className="contact-us-card__inputs-wrapper">
					<Input
						type="text"
						placeholder="Full Name"
						value={inputState.fullNameInput.val}
						onChange={(e) => inputDispatch({type: "updateState", payload: {fullNameInput: {...inputState.fullNameInput, val: e.target.value}}})}
						errMsg="Invalid input"
						throwErr={inputState.fullNameInput.trhowErr}
					/>
					<Input
						type="email"
						placeholder="Email"
						value={inputState.emailInput.val}
						onChange={(e) => inputDispatch({type: "updateState", payload: {emailInput: {...inputState.emailInput, val: e.target.value}}})}
						errMsg="Invalid Email"
						throwErr={inputState.emailInput.trhowErr}
					/>
					<Input
						type="text"
						placeholder="Description"
						value={inputState.descriptionInput.val}
						onChange={(e) => inputDispatch({type: "updateState", payload: {descriptionInput: {...inputState.descriptionInput, val: e.target.value}}})}
						errMsg="Invalid input"
						throwErr={inputState.descriptionInput.trhowErr}
					/>
				</div>
			)}
			<button className="primary-button contact-us-card__button" onClick={handleSend}>
				{buttonText}
			</button>
			{success && <SuccessAlert text="Your details sent successfully" />}
		</div>
	);
}

export default forwardRef(ContactUsCard);
