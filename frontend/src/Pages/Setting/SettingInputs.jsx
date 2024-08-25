import {useReducer, useEffect} from "react";
import "./SettingInputs.css";

import {useNavigate} from "react-router-dom";
import {userApi, useUpdateUserMutation} from "../../Redux/Services/userApi";

import {ReactComponent as EyeIcon} from "../../Assets/icons/eye_icon.svg";

import Input from "../../Components/Input";
import ErrAlert from "../../Components/ErrAlert";
import SuccessAlert from "../../Components/SuccessAlert";
import useCheckToken from "../../Hooks/useIsUserConnect";

const initialState = {
	eyeClick: false,
	showIndication: "",
	fullName: {val: "", errText: "", trhowErr: false},
	email: {val: "", errText: "", trhowErr: false},
	password: {val: "", errText: "", trhowErr: false},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "updateState":
			return {...state, ...action.payload};
		case "setEyeClick":
			return {...state, eyeClick: !state.eyeClick};
		case "initState":
			return initialState;
		case "hideErrors":
			return {
				...state,
				fullName: {...state.fullName, trhowErr: false},
				email: {...state.email, trhowErr: false},
				password: {...state.password, trhowErr: false},
			};
		case "showIndication":
			return {...state, showIndication: action.payload};
		default:
			console.error("error in setting inputs reducer");
	}
};

export default function SettingInputs() {
	const navigate = useNavigate();
	const [inputState, inputDispatch] = useReducer(reducer, initialState);
	const [updateUser] = useUpdateUserMutation();
	const {data} = userApi.endpoints.getUser.useQueryState();

	useEffect(() => {
		inputDispatch({type: "updateState", payload: {fullName: {...inputState.fullName, val: data?.fullName}}});
		inputDispatch({type: "updateState", payload: {email: {...inputState.email, val: data?.email}}});
	}, [data]);

	//save inputs changes
	const handleSaveChanges = () => {
		inputDispatch({type: "hideErrors"});
		var inputs;
		inputState.password.val !== ""
			? (inputs = {fullName: inputState.fullName.val, email: inputState.email.val, password: inputState.password.val})
			: (inputs = {fullName: inputState.fullName.val, email: inputState.email.val});

		updateUser({
			url: "update-user-fileds",
			body: inputs,
		})
			.unwrap()
			.then(() => {
				inputDispatch({type: "showIndication", payload: "success"});
				setTimeout(() => inputDispatch({type: "showIndication", payload: ""}), 3000);
			})
			.catch(({data}) => {
				if (data.inputsError) {
					Object.keys(data.inputsError).forEach((key) => {
						inputDispatch({
							type: "updateState",
							payload: {[key]: {...inputState[key], errText: data.inputsError[key].message, trhowErr: true}},
						});
					});
				} else {
					inputDispatch({type: "showIndication", payload: "data"});
					setTimeout(() => inputDispatch({type: "showIndication", payload: ""}), 3000);
				}

				if (data.authErr) navigate("/login");
			});
	};

	return (
		<>
			<div className="setting-inputs__container">
				<Input
					type="text"
					placeholder="Full Name"
					onChange={(e) => inputDispatch({type: "updateState", payload: {fullName: {...inputState.fullName, val: e.target.value}}})}
					value={inputState.fullName.val}
					errMsg={inputState.fullName.errText}
					throwErr={inputState.fullName.trhowErr}
				/>
				<Input
					type="text"
					placeholder="Email"
					onChange={(e) => inputDispatch({type: "updateState", payload: {email: {...inputState.email, val: e.target.value}}})}
					value={inputState.email.val}
					errMsg={inputState.email.errText}
					throwErr={inputState.email.trhowErr}
				/>
				<div className="setting-inputs__password-container">
					<Input
						type={inputState.eyeClick ? "text" : "password"}
						placeholder="New Password"
						onChange={(e) => inputDispatch({type: "updateState", payload: {password: {...inputState.passwrod, val: e.target.value}}})}
						value={inputState.password.val}
						errMsg={inputState.password.errText}
						throwErr={inputState.password.trhowErr}
						autocomplete="new-password"
					/>
					<button
						className={inputState.password.trhowErr ? "setting-inputs__eye-on-err" : undefined}
						onClick={() => inputDispatch({type: "setEyeClick"})}
					>
						<EyeIcon />
					</button>
				</div>
			</div>
			<button className="primary-button" onClick={handleSaveChanges}>
				save changes
			</button>
			{inputState.showIndication == "data" && <ErrAlert text="something went wrong try agin later" />}
			{inputState.showIndication == "success" && <SuccessAlert text="Changes saved successfully" />}
		</>
	);
}
