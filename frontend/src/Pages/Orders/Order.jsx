import {useState, forwardRef, useImperativeHandle} from "react";
import "./Order.css";

import OrderItem from "./OrderItem";

export default forwardRef(function Order({order, closeExtand}, ref) {
	const [extend, setExtend] = useState(false);

	useImperativeHandle(ref, () => ({
		closeExtand: () => {
			setExtend(false);
		},
	}));

	const handleExtend = () => {
		closeExtand();
		setExtend(true);
	};

	return (
		<div className="order" onClick={handleExtend}>
			{!extend && (
				<button>
					<div className="order__images-container">
						<div>
							<img src={order.items[1]?.img} />
						</div>
						<div>
							<img src={order.items[0]?.img} />
						</div>
						<div>
							<img src={order.items[2]?.img} />
						</div>
						<div>
							<img src={order.items[3]?.img} />
						</div>
					</div>
					<h4>Tracking ID:{order._id}</h4>
				</button>
			)}
			{extend && (
				<>
					<div className="order__items-container">
						{order.items.map((item) => (
							<OrderItem item={item} />
						))}
					</div>
					<div className="order__shipping-info">
						<h3>Shipping info</h3>
						<div>
							<strong>Order Address</strong>
							<span>
								{order.address.city},{order.address.street},{order.address.zipCode}.
							</span>
						</div>
						<div>
							<strong>Tracking ID:</strong>
							<span>{order._id}</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
});
