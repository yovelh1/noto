import {useState, useReducer, forwardRef, useImperativeHandle} from "react";
import "./AddAddress.css";

import {useNavigate} from "react-router-dom";
import {useUpdateUserMutation} from "../../Redux/Services/userApi";

import Input from "../Input";

const initialState = {
	_id: {val: ""},
	default: {val: ""},
	addressName: {val: "", errText: "", trhowErr: false},
	city: {val: "", errText: "", trhowErr: false},
	street: {val: "", errText: "", trhowErr: false},
	zipCode: {val: "", errText: "", trhowErr: false},
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
				addressName: {...state.addressName, trhowErr: false},
				city: {...state.city, trhowErr: false},
				street: {...state.street, trhowErr: false},
				zipCode: {...state.zipCode, trhowErr: false},
			};
		default:
			console.error("error in editAddress reducer");
	}
};

export default forwardRef(function EditAddress({showErr}, ref) {
	const navigate = useNavigate();
	const [inputState, inputDispatch] = useReducer(reducer, initialState);
	const [showInputs, setShowInputs] = useState(false);
	const [updateUser] = useUpdateUserMutation();

	//check if new address is valid than add to state
	const handleAddAddress = () => {
		inputDispatch({type: "hideErrors"});
		if (!showInputs) setShowInputs(true);
		else {
			var method, updateAddress;
			if (inputState._id.val === "") {
				method = "ADD";
				updateAddress = {
					addressName: inputState.addressName.val,
					city: inputState.city.val,
					street: inputState.street.val,
					zipCode: inputState.zipCode.val,
					default: false,
				};
			} else {
				method = "UPDATE";
				updateAddress = {
					_id: inputState._id.val,
					default: inputState.default.val,
					addressName: inputState.addressName.val,
					city: inputState.city.val,
					street: inputState.street.val,
					zipCode: inputState.zipCode.val,
				};
			}
			updateUser({url: "update-address", headers: {method: method}, body: updateAddress})
				.unwrap()
				.then(() => {
					setShowInputs(false);
					inputDispatch({type: "initState"});
				})
				.catch(({data}) => {
					if (data.inputsError) {
						Object.keys(data.inputsError).forEach((key) => {
							var currentKey = key.split(".")[2];
							inputDispatch({
								type: "updateState",
								payload: {[currentKey]: {...inputState[currentKey], errText: data.inputsError[key].message, trhowErr: true}},
							});
						});
					}
					if (data.authErr) {
						navigate("/login");
					} else {
						showErr();
					}
				});
		}
	};

	useImperativeHandle(ref, () => ({
		editExistAddress: (item) => {
			setShowInputs(true);
			Object.keys(item).forEach((key) => {
				inputDispatch({
					type: "updateState",
					payload: {[key]: {...inputState[key], val: item[key]}},
				});
			});
		},
	}));

	return (
		<div className="edit-address">
			{showInputs && (
				<>
					<Input
						value={inputState.addressName.val}
						onChange={(e) =>
							inputDispatch({type: "updateState", payload: {...inputState, addressName: {...inputState.addressName, val: e.target.value}}})
						}
						throwErr={inputState.addressName.trhowErr}
						errMsg={inputState.addressName.errText}
						type="text"
						placeholder="Name"
					/>
					<Input
						value={inputState.city.val}
						onChange={(e) => inputDispatch({type: "updateState", payload: {...inputState, city: {...inputState.city, val: e.target.value}}})}
						throwErr={inputState.city.trhowErr}
						errMsg={inputState.city.errText}
						type="text"
						placeholder="City"
					/>
					<Input
						value={inputState.street.val}
						onChange={(e) => inputDispatch({type: "updateState", payload: {...inputState, street: {...inputState.street, val: e.target.value}}})}
						throwErr={inputState.street.trhowErr}
						errMsg={inputState.street.errText}
						type="text"
						placeholder="Street"
					/>
					<Input
						value={inputState.zipCode.val}
						onChange={(e) => inputDispatch({type: "updateState", payload: {...inputState, zipCode: {...inputState.zipCode, val: e.target.value}}})}
						throwErr={inputState.zipCode.trhowErr}
						errMsg={inputState.zipCode.errText}
						type="text"
						placeholder="ZIP Code"
					/>
				</>
			)}
			<button className="primary-button" onClick={handleAddAddress}>
				Add
			</button>
		</div>
	);
});
