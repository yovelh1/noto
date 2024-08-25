import {useEffect} from "react";

import {Routes, Route} from "react-router-dom";

import {getCookie} from "./Util/cookies";

import {useGetUserQuery, useRemoveUserMutation} from "./Redux/Services/userApi";

import useIsMobile from "./Hooks/useIsMobile";

import Header from "./Components/Header";

import BottomNav from "./Components/Nav/BottomNav";
import Nav from "./Components/Nav/Nav";
import {ContactUs, Home, Login, Setting, Category, Item, Orders, Payment, Page404} from "./Pages/index";

function App() {
	const isMobile = useIsMobile();
	const {error} = useGetUserQuery(undefined, {skip: getCookie("accessToken") ? false : true});
	const [removeUser] = useRemoveUserMutation();

	// useEffect(() => {
	// 	if (error) {
	// 		removeUser();
	// 	}
	// }, [error]);

	return (
		<div className="App">
			<Header />
			<Nav />
			{isMobile && <BottomNav />}
			<Routes>
				<Route path="setting" element={<Setting />} />
				<Route path="contact-us" element={<ContactUs />} />
				<Route path="orders" element={<Orders />} />
				<Route path="payment" element={<Payment />} />
				<Route path="item/:itemId" element={<Item />} />
				<Route path="category/:categoryId" element={<Category />} />
				<Route path="login" element={<Login />} />
				<Route path="*" element={<Page404 />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
