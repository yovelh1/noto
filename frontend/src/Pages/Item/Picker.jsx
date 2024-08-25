import {useState, useImperativeHandle, forwardRef, useEffect} from "react";

import "./Picker.css";

export default forwardRef(function Picker({colors, params}, ref) {
	const [color, setColor] = useState({color: "color", show: false});
	const [size, setSize] = useState({size: "size", show: false});
	const [qty, setQty] = useState({qty: "qty", show: false});
	const [sizeArray, setSizeArray] = useState([]);

	useEffect(() => {
		if (params) {
			params.color && setColor({...color, color: params.color});
			params.size && setSize({...size, size: params.size});
			params.qty && params.size && setQty({...qty, qty: params.qty});
		}
	}, [params]);

	const handleColorClick = () => {
		setColor({...color, show: !color.show});
		setSize({...size, show: false});
	};

	const onChooseColor = (chosenColor) => {
		if (colors[chosenColor]) {
			setColor({color: chosenColor, show: false});
			setSizeArray(colors[chosenColor]);
			setSize({...size, size: "size"});
			setQty({...qty, qty: "qty"});
		}
	};

	const handleSizeClick = () => {
		setSize({...size, show: !size.show});
		setColor({...color, show: false});
	};

	const onChooseSize = (chosenSize) => {
		setSize({size: chosenSize, show: false});
	};

	const handleQtyClick = () => {
		setQty({...qty, show: !qty.show});
	};

	const onChooseQty = (chosenQty) => {
		setQty({qty: chosenQty, show: false});
	};

	useImperativeHandle(ref, () => ({
		checkInputs: () => {
			if (color.color === "color") return "you must choose color";
			else if (size.size === "size") return "you must choose size";
			else if (qty.qty === "qty") return "you must choose qty";
			else return "";
		},
		getItemData: () => {
			return {
				color: color.color,
				size: size.size,
				qty: qty.qty,
			};
		},
	}));

	return (
		<div className="picker">
			<div className="picker__line">
				<div className="picker__container">
					<button onClick={handleColorClick}>{color.color}</button>
					{color.show && (
						<div className={color.show ? "picker__inner-container picker__selected" : "picker__inner-container "}>
							<>
								<button onClick={handleColorClick}>{color.color}</button>
								<ul>
									{Object.keys(colors)?.map((item, i) => (
										<li key={i} onClick={() => onChooseColor(item)}>
											{item}
										</li>
									))}
								</ul>
							</>
						</div>
					)}
				</div>
				<div className="picker__container">
					<button onClick={handleSizeClick} disabled={sizeArray.length === 0 ? true : false}>
						{size.size}
					</button>
					{size.show && (
						<div className={size.show ? "picker__inner-container picker__selected" : "picker__inner-container "}>
							<>
								<button onClick={handleSizeClick}>{size.size}</button>
								<ul>
									{sizeArray?.map((item, i) => (
										<li key={i} onClick={() => onChooseSize(item)}>
											{item}
										</li>
									))}
								</ul>
							</>
						</div>
					)}
				</div>
			</div>

			<div className="picker__line">
				<div className="picker__container">
					<button onClick={handleQtyClick}>{qty.qty}</button>
					{qty.show && (
						<div className={qty.show ? "picker__inner-container picker__selected" : "picker__inner-container "}>
							<>
								<button onClick={handleQtyClick}>{qty.qty}</button>
								<ul>
									{Array.from(Array(11).keys())
										.slice(1, 11)
										.map((item, i) => (
											<li key={i} onClick={() => onChooseQty(item)}>
												{item}
											</li>
										))}
								</ul>
							</>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});
