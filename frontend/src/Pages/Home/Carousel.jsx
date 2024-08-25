import {useRef, useState, useEffect} from "react";
import "./Carousel.css";
import {useSelector} from "react-redux";
import CarouselSlide from "./CarouselSlide";

import {ReactComponent as ArrowLeftIcon} from "../../Assets/icons/arrow_left_icon.svg";
import {ReactComponent as ArrowRightIcon} from "../../Assets/icons/arrow_right_icon.svg";

export default function Carousel({title, slides}) {
	const StyleState = useSelector((state) => state.style);
	const sliderRef = useRef(null);
	const containerRef = useRef(null);
	const intervalRef = useRef(null);
	const [direction, setDirection] = useState();
	const [slideWidth, setSlideWidth] = useState();
	const [translte, setTranslte] = useState();

	useEffect(() => {
		const handleSize = () => {
			if (containerRef?.current?.offsetWidth) {
				var numSlides = StyleState.isMobile ? (numSlides = 1) : (numSlides = 3);
				var margin = 20;
				var width = (containerRef.current.offsetWidth - margin * (numSlides - 1)) / numSlides;
				var myTranslate = width + margin;
				setSlideWidth(width);
				setTranslte(myTranslate);
				sliderRef.current.style.transform = "translate(-" + myTranslate + "px)";
				sliderRef.current.style.columnGap = margin + "px";
			}
		};
		handleSize();
		window.addEventListener("resize", handleSize);
	}, [slides.length != 0]);

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			handleNext();
		}, 3500);
		return () => clearInterval(intervalRef.current);
	}, [translte]);

	const handleTransitionEnd = () => {
		if (direction === 1) {
			sliderRef.current.prepend(sliderRef.current.lastElementChild);
		} else if (direction === -1) {
			sliderRef.current.appendChild(sliderRef.current.firstElementChild);
		}
		sliderRef.current.style.transition = "none";
		sliderRef.current.style.transform = "translateX(-" + translte + "px)";
		setTimeout(() => {
			sliderRef.current.style.transition = "all 1s ease-in-out";
		});
	};

	const handleNext = (stop) => {
		stop && clearInterval(intervalRef.current);
		setDirection(-1);
		sliderRef.current.style.transform = "translateX(-" + translte * 2 + "px)";
	};

	const handlePrev = () => {
		clearInterval(intervalRef.current);
		if (direction === -1) {
			setDirection(1);
			sliderRef.current.appendChild(sliderRef.current.firstElementChild);
		}
		setDirection(1);
		sliderRef.current.style.transform = "translateX(0)";
	};

	return (
		<>
			<h2 className="carousel__title">{title}</h2>
			<div className="carousel__carousel">
				<button onClick={handlePrev} className="carousel__arrow">
					<ArrowLeftIcon />
				</button>
				<div className="carousel__container" ref={containerRef}>
					<div className="carousel__slider" onTransitionEnd={handleTransitionEnd} ref={sliderRef}>
						{slides?.map((product, i) => (
							<CarouselSlide key={i} product={product} slideWidth={slideWidth} />
						))}
					</div>
				</div>
				<button onClick={() => handleNext(true)} className="carousel__arrow">
					<ArrowRightIcon />
				</button>
			</div>
		</>
	);
}
