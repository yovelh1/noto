import {useState} from "react";
import "./Login.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useLoginMutation} from "../../Redux/Services/authApi";

import Input from "../../Components/Input";
import EditAvatar from "../../Components/EditAvatar";
import ErrAlert from "../../Components/ErrAlert";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const navigate = useNavigate();
	const [isLogin, setisLogin] = useState(true);
	const [errMssg, setErrMssg] = useState();
	const [login] = useLoginMutation();

	const onSubmit = (data) => {
		setErrMssg("");
		if (isLogin) delete data.fullName;
		login({isLogin, data})
			.unwrap()
			.then(() => navigate("/"))
			.catch(({data}) => typeof data === "string" && setErrMssg(data));
	};

	return (
		<div className="login page">
			<h1 className="login__title">NOTO</h1>
			<div className="login__main-wrapper">
				<form onSubmit={handleSubmit(onSubmit)}>
					{!isLogin && (
						<>
							<EditAvatar />
							<Input
								placeholder="Full Name"
								name="fullName"
								register={register}
								validations={{required: {value: !isLogin, message: "this field is required"}}}
								errMsg={errors?.fullName?.message}
							/>
						</>
					)}
					<Input
						placeholder="Email"
						name="email"
						register={register}
						validations={{
							required: {value: true, message: "this field is required"},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "invalid email address",
							},
						}}
						errMsg={errors?.email?.message}
					/>

					<Input
						type="password"
						placeholder="Password"
						name="password"
						register={register}
						validations={{
							required: {value: true, message: "this field is required"},
							minLength: {value: 8, message: "password field must contain at least 8 characters"},
						}}
						errMsg={errors?.password?.message}
					/>

					<button type="submit" className="primary-button login__primary-button">
						{isLogin ? "Login" : "Register"}
					</button>

					{errMssg && <ErrAlert text={errMssg} />}

					<button type="button" onClick={() => setisLogin(!isLogin)} className="primary-button login__secondry-button">
						{isLogin ? "Register" : "Back"}
					</button>
				</form>
			</div>
		</div>
	);
}
