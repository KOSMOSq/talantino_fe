import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

import { pages } from "../../../common/common";
import logo from "../../../assets/logo/talantinoLogo.png";

function AppBarItems() {
	return (
		<>
			<img src={logo} alt="logo" width={160} />
			{pages.map((page) => (
				<Button
					key={page}
					component={NavLink}
					to={`${page.toLowerCase()}`}
					sx={{ padding: 3, fontSize: 20 }}
				>
					{page}
				</Button>
			))}
		</>
	);
}

export { AppBarItems };
