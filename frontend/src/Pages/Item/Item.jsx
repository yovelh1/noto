import {useState, useRef} from "react";
import "./Item.css";

import {useParams, useNavigate} from "react-router-dom";

import {ReactComponent as Whishlist_icon} from "../../Assets/icons/wishlist_icon.svg";

import {useDispatch, useSelector} from "react-redux";

import {changeCartDisplay, changeWishlistDisplay} from "../../Redux/Reducers/styleSlice";

import {useGetProductQuery} from "../../Redux/Services/productApi";
import {useUpdateUserMutation, userApi} from "../../Redux/Services/userApi";

import useGetParams from "./useGetParams";

import Picker from "./Picker";
import ErrAlert from "../../Components/ErrAlert";

export default function Item() {
	//TODO: try to make this code simpler
	//TODO: if data not fetched return login else return page
	const {itemId} = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.user?.data);
	const styeleState = useSelector((state) => state.style);
	const pickerRef = useRef(null);
	const [showAlert, setShowAlert] = useState({show: false, text: ""});
	const {data, isSuccess} = useGetProductQuery(itemId);
	const params = useGetParams({data, isSuccess});
	const [updateUser] = useUpdateUserMutation();

	const addItem = (path) => {
		if (user) {
			pickerRef.current.checkInputs() !== ""
				? setShowAlert({show: true, text: pickerRef.current.checkInputs()})
				: setShowAlert({show: false, text: ""});
			if (pickerRef.current.checkInputs() === "") {
				const ItemData = pickerRef.current.getItemData();
			}
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="item page">
			{data && (
				<>
					<div className="item__content-container">
						<h2>{data.title}</h2>
						<strong>${data.price}</strong>
						<Picker colors={data.color[0]} params={params} ref={pickerRef} />
						<small>ID:{data._id?.slice(0, 5)}</small>
						<h4>Description</h4>
						<p>{data.description}</p>
						<button className="primary-button item__button" onClick={() => addItem("cart")}>
							add to cart
						</button>
						{!styeleState.isMobile && (
							<button className="primary-button item__button" onClick={() => addItem("wishlist")}>
								add to Wishlist
							</button>
						)}
						{showAlert.show && (
							<div className="item__alert">
								<ErrAlert text={showAlert.text} />
							</div>
						)}
					</div>

					<div className="item__img-container">
						{styeleState.isMobile && (
							<button onClick={() => addItem("wishlist")}>
								<Whishlist_icon width={20} height={20} />
							</button>
						)}
						<img src={data.img} />
					</div>
				</>
			)}
		</div>
	);
}
