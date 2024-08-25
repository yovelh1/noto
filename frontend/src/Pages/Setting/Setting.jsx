import React from "react";
import "./Setting.css";
import {useNavigate} from "react-router-dom";

import {useRemoveUserMutation} from "../../Redux/Services/userApi";

import {ReactComponent as LogoutIcon} from "../../Assets/icons/log_out_icon.svg";

import useIsUserConnect from "../../Hooks/useIsUserConnect";

import SettingInputs from "./SettingInputs";
import CreditCard from "../../Components/CreditCard/CreditCard";
import Address from "../../Components/Address/Address";
import EditAvatar from "../../Components/EditAvatar";

export default function Setting() {
	useIsUserConnect();
	const navigate = useNavigate();
	const [removeUser] = useRemoveUserMutation();

	const handleLogOut = () => {
		removeUser()
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch(() => {
				navigate("/");
			});
	};

	return (
		<div className="page">
			<h1 className="setting__title">Setting</h1>
			<section className="setting__section">
				<h4 className="setting__section-title">Personal</h4>
				<EditAvatar />
				{/* <SettingInputs /> */}
			</section>
			<section className="setting__section">
				<h4 className="setting__section-title">Address</h4>
				<Address />
			</section>
			<section className="setting__section">
				<h4 className="setting__section-title">Payment</h4>
				<CreditCard />
			</section>
			<section className="setting__section">
				<button className="setting__logout-button" onClick={handleLogOut}>
					<LogoutIcon />
					<strong>Log out</strong>
				</button>
			</section>
		</div>
	);
}
