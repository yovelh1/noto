import {useState, useEffect} from "react";

export default function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
	}, []);
	return isMobile;
}
