import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";
import {useGetSalesProductQuery} from "../../Redux/Services/productApi";
import Carousel from "./Carousel";

export default function Home() {
	const {data: salesProducts} = useGetSalesProductQuery();
	return (
		<div className="home page">
			<div className="home__categories-container">
				<Link to="category/men">
					<div>
						<h2>Men</h2>
						<div className="home__arrow home__arrow-left">
							<div></div>
						</div>
					</div>
				</Link>
				<Link to="category/women">
					<div>
						<h2>Woman</h2>
						<div className="home__arrow home__arrow-right">
							<div></div>
						</div>
					</div>
				</Link>
			</div>
			{salesProducts && <Carousel title="Sales" slides={salesProducts} />}
		</div>
	);
}
