import React from "react";
import "./CategoryItem.css";

import {Link} from "react-router-dom";

export default function CategoryItem({item}) {
	return (
		<div className="category-item">
			<Link to={"/item/" + item._id}>
				<img src={item.img} />
				<span>{item.title}</span>
			</Link>
		</div>
	);
}
