import {useState, useRef} from "react";
import "./Address.css";

import {userApi} from "../../Redux/Services/userApi";

import ErrAlert from "../ErrAlert";
import AddAdress from "./AddAddress";
import AddressItem from "./AddressItem";

export default function Address() {
	const {data} = userApi.endpoints.getUser.useQueryState();
	const editAddressRef = useRef(null);
	const [errMssg, setEerrMssg] = useState(false);

	const handleEditAddress = (item) => {
		editAddressRef.current.editExistAddress(item);
	};

	const showErr = () => {
		setEerrMssg(true);
		setTimeout(() => setEerrMssg(false), 3000);
	};

	return (
		<div className="address">
			{data?.address?.length > 0 ? (
				<div className="address__address-container">
					{data?.address?.map((item, i) => (
						<AddressItem key={i} item={item} handleEditAddress={handleEditAddress} showErr={showErr} />
					))}
				</div>
			) : (
				<div className="address__no-address">
					<strong>NO ADDRESS</strong>
				</div>
			)}
			<AddAdress ref={editAddressRef} showErr={showErr} />
			{errMssg === true && <ErrAlert text="something went wrong try agin later" />}
		</div>
	);
}
