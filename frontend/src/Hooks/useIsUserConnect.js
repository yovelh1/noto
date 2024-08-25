import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function useIsUserConnect() {
	const user = useSelector((state) => state?.user?.data);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user]);
	return;
}
