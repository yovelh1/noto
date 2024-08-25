import { useRef, useEffect } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ step }) {
	const dotRef = { 0: useRef(null), 1: useRef(null), 2: useRef(null) };
	useEffect(() => {
		if (step == 0) {
			document.documentElement.style.setProperty("--progress-bar-width", "0%");
			dotRef["0"]?.current.classList.add("progressBar__marked");
			dotRef["1"]?.current.classList.remove("progressBar__marked");
			dotRef["2"]?.current.classList.remove("progressBar__marked");
		} else if (step == 1) {
			document.documentElement.style.setProperty("--progress-bar-width", "50%");
			dotRef["0"]?.current.classList.add("progressBar__marked");
			dotRef["1"]?.current.classList.add("progressBar__marked");
			dotRef["2"]?.current.classList.remove("progressBar__marked");
		} else if (step == 2) {
			document.documentElement.style.setProperty("--progress-bar-width", "100%");
			dotRef["0"]?.current.classList.add("progressBar__marked");
			dotRef["1"]?.current.classList.add("progressBar__marked");
			dotRef["2"]?.current.classList.add("progressBar__marked");
		}
	}, [step]);
	return (
		<div className="progressBar">
			<div className="progressBar__dot" ref={dotRef["0"]}></div>
			<div className="progressBar__dot" ref={dotRef["1"]}></div>
			<div className="progressBar__dot" ref={dotRef["2"]}></div>
		</div>
	);
}
