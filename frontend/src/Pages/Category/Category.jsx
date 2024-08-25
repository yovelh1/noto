import React from "react";
import "./Category.css";

import {useParams} from "react-router-dom";

import {useGetCategoryProductsQuery} from "../../Redux/Services/productApi";

import CategoryItem from "./CategoryItem";

export default function Category() {
	const {categoryId} = useParams();
	const {data} = useGetCategoryProductsQuery(categoryId);

	return (
		<div className="category page">
			{data && (
				<>
					<h1>
						{categoryId
							.split("-")
							.map((name) => {
								return name[0].toUpperCase() + name.slice(1);
							})
							.join(" ")}
					</h1>
					<div className="category__items-container">
						{data.map((item) => (
							<CategoryItem item={item} />
						))}
					</div>
				</>
			)}
		</div>
	);
}
