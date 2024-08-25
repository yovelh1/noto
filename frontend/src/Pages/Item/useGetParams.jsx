import {useState, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";

export default function useGetParams({data, isSuccess}) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [params, setParams] = useState({});

	useEffect(() => {
		if (isSuccess) {
			if (searchParams.get("color") && searchParams.get("size") && searchParams.get("qty")) {
				var paramsData = {};
				if (data.color[0][searchParams.get("color")]) paramsData = {...paramsData, color: searchParams.get("color")};
				if (data.color[0][searchParams.get("color")].includes(searchParams.get("size"))) paramsData = {...paramsData, size: searchParams.get("size")};
				if (parseInt(searchParams.get("qty")) <= 10) paramsData = {...paramsData, qty: searchParams.get("qty")};
				setParams(paramsData);
			}
		}
	}, [isSuccess, navigate]);

	return params;
}
