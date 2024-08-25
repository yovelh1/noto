import React from "react";
import "./OrderItem.css";

export default function OrderItem({item}) {
	return (
		<div className="order-item ">
			<img src={item.img} />
			<strong>{item.title}</strong>
			<div className="order-item__details">
				<span>ID:{item._id.slice(0, 10)}</span>|<span>{item.size}</span>|<span>{item.color}</span>|<span>X{item.quantity}</span>
			</div>
		</div>
	);
}
