import {useState} from "react";
import "./Input.css";

import {ReactComponent as ErrIcon} from "../Assets/icons/err_icon.svg";

export default function Input({type, name, placeholder, errMsg, autocomplete, register, validations}) {
	const [isFocused, setIsfocused] = useState(false);
	return (
		<div className="input">
			<div className={`input__input-wrapper ${errMsg ? "input__input-err" : isFocused && "input__input-focus"}`}>
				<input
					type={type}
					placeholder={placeholder}
					onFocus={() => setIsfocused(true)}
					onBlur={() => setIsfocused(false)}
					autoComplete={autocomplete}
					{...register(name, validations)}
				/>
				{errMsg && (
					<div className="input__err-icon">
						<ErrIcon />
					</div>
				)}
			</div>
			{errMsg && <span className="input__err-msg">{errMsg}</span>}
		</div>
	);
}
