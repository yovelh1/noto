import {useRef, useEffect} from "react";
import "./Orders.css";

import {userApi} from "../../Redux/Services/userApi";

import useIsUserConnect from "../../Hooks/useIsUserConnect";

import Order from "./Order";

export default function Orders() {
	useIsUserConnect();
	const {data} = userApi.endpoints.getUser.useQueryState();
	const ordersRef = useRef([]);

	const closeAllExtend = () => {
		ordersRef.current.forEach((order) => order.closeExtand());
	};
	return (
		<div className="orders page">
			<h1 className="orders__title">Orders</h1>
			<div className="orders__container">
				{data?.orders?.map((item, i) => (
					<Order key={i} order={item} closeExtand={closeAllExtend} ref={(el) => (ordersRef.current[i] = el)} />
				))}
			</div>
		</div>
	);
}
