import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setCookie = (key, value) => {
	value ? cookies.set(key, value) : cookies.remove(key);
};

export const getCookie = (key) => {
	return cookies.get(key);
};
