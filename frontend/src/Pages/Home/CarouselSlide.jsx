import {useRef, useEffect} from "react";
import "./CarouselSlide.css";

import {Link} from "react-router-dom";

export default function CarouselSlide({product, slideWidth}) {
	const slideRef = useRef(null);

	useEffect(() => {
		slideRef.current.style.minWidth = slideWidth + "px";
	}, [slideWidth]);

	return (
		<div className="carousel-slide" ref={slideRef}>
			<Link to={`/item/${product._id}`}>
				<img src={product.img} />
				<span>{product.title}</span>
			</Link>
		</div>
	);
}
