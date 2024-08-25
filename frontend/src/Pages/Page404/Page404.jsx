import React from "react";
import "./Page404.css";

export default function Page404() {
	return (
		<div className="page404">
			<div className="page404__container">
				<h1>404</h1>
				<h3>Page not found</h3>
				<a href="/" className="primary-button">
					Back to home
				</a>
			</div>
		</div>
	);
}
