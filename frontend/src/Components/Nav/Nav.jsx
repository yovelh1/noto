import {useEffect, useRef} from "react";
import "./Nav.css";
import {Link, useLocation} from "react-router-dom";
import {ReactComponent as Dot_icon} from "../../Assets/icons/dot_icon.svg";

const navItems = [
	{label: "Men", path: "/category/men"},
	{label: "Home", path: "/"},
	{label: "Women", path: "/category/women"},
	{label: "Contact Us", path: "/contact-us"},
];

export default function Nav() {
	const location = useLocation();
	const ref = useRef();
	const dotRef = useRef(null);

	useEffect(() => {
		const currentNavIndex = navItems.findIndex((nav) => nav.path === location.pathname);
		if (currentNavIndex === -1) {
			dotRef.current.style.display = "none";
			return;
		}

		let dotPos = 0;
		Object.values(ref)
			.filter((r) => r)
			.forEach((nav, i) => {
				if (i < currentNavIndex) dotPos += nav.offsetWidth;
				if (i === currentNavIndex) {
					dotPos += nav.offsetWidth / 2;
					nav.style.color = "#111";
				} else nav.style.color = "#B7B7B8";
			});
		dotRef.current.style.left = `${dotPos - dotRef.current.offsetWidth / 2}px`;
		dotRef.current.style.display = "flex";
	}, [location.pathname]);

	return (
		<div className="nav">
			<nav className="nav__nav">
				<ul>
					{navItems.map(({label, path}, i) => (
						<li key={i}>
							<Link ref={(r) => (ref[i] = r)} to={path}>
								{label}
							</Link>
						</li>
					))}
				</ul>
				<div className="nav__position">
					<div className="nav__dot" ref={dotRef}>
						<Dot_icon />
					</div>
				</div>
			</nav>
		</div>
	);
}
