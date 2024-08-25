import {useState, useRef, useEffect} from "react";
import "./Payment.css";

import {useNavigate} from "react-router-dom";

import {userApi, useUpdateUserMutation} from "../../Redux/Services/userApi";

import useIsUserConnect from "../../Hooks/useIsUserConnect";

import ProgressBar from "./ProgressBar";
import SubTotal from "./SubTotal";
import ErrAlert from "../../Components/ErrAlert";
import CartItem from "../../Components/Cart/CartItem";
import Address from "../../Components/Address/Address";
import CreditCard from "../../Components/CreditCard/CreditCard";

export default function Payment() {
	useIsUserConnect();
	const navigate = useNavigate();
	const stepsRef = useRef(null);
	const [step, setStep] = useState("0");
	const [errMssg, setErrMssg] = useState("");
	const {data} = userApi.endpoints.getUser.useQueryState();
	const [updateUser] = useUpdateUserMutation();

	useEffect(() => {
		if (step == 0) stepsRef.current.style.transform = "translateX(0%)";
		else if (step == 1) stepsRef.current.style.transform = "translateX(-33.33%)";
		else if (step == 2) stepsRef.current.style.transform = "translateX(-66.66%)";
	}, [step]);

	const handleNext = (step) => {
		setErrMssg("");
		switch (step) {
			case 1:
				if (data?.cartItems?.items?.length > 0) setStep(step);
				else setErrMssg("your cart is empty");
				break;
			case 2:
				var isDefault = false;
				data?.address?.forEach((address) => {
					if (address.default) isDefault = true;
				});
				if (isDefault) setStep(step);
				else setErrMssg("you must to choose address");

				break;
			case 3:
				var isDefault = false;
				data?.cards?.forEach((card) => {
					if (card.default) isDefault = true;
				});
				if (isDefault) handlePay();
				else setErrMssg("you must to choose credit card to pay");
				break;
		}
	};

	const handlePay = () => {
		var addressIndex = data?.address?.findIndex((address) => address.default === true);
		updateUser({
			url: "pay",
			body: {items: data?.cartItems?.items, total: data?.cartItems?.total, address: data?.address[addressIndex]},
		})
			.unwrap()
			.then(() => navigate("/orders"))
			.catch(({data}) => {
				if (data.authErr) {
					navigate("/login");
				} else setErrMssg("something went wrong try agin later");
			});
	};

	return (
		<div className="payment page">
			<ProgressBar step={step} />
			<div className="payment__steps-container" ref={stepsRef}>
				<div className="payment__step-container">
					<div className="payment__step-inner-container">
						<h2>Confirm Items</h2>
						<div className="payment__items-container">
							{data?.cartItems?.items.length > 0 ? (
								data?.cartItems?.items?.map((item, i) => <CartItem key={i} item={item} />)
							) : (
								<div className="payment__item-no-items">
									<strong>NO ITEMS IN CART</strong>
								</div>
							)}
						</div>
						<SubTotal />
						<button className="primary-button" onClick={() => handleNext(1)}>
							Continue to payment
						</button>
						{errMssg !== "" && <ErrAlert text={errMssg} />}
					</div>
				</div>
				<div className="payment__step-container">
					<div className="payment__step-inner-container">
						<h2>Select or add a shipping address</h2>
						<Address />
						<SubTotal />
						<button className="primary-button" onClick={() => handleNext(2)}>
							Continue to payment
						</button>
						{errMssg !== "" && <ErrAlert text={errMssg} />}
					</div>
				</div>
				<div className="payment__step-container">
					<div className="payment__step-inner-container">
						<h2>Select your payment method</h2>

						<CreditCard />

						<SubTotal />
						<button className="primary-button" onClick={() => handleNext(3)}>
							pay
						</button>
						{errMssg !== "" && <ErrAlert text={errMssg} />}
					</div>
				</div>
			</div>
		</div>
	);
}
