import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { pages } from "../../../common/common";

function AppBarItems() {
	return (
		<>
			{pages.map((page) => (
				<Typography
					component={NavLink}
					to={`${page.toLowerCase()}`}
					sx={{ padding: 3, fontSize: 20 }}
				>
					{page}
				</Typography>
			))}
		</>
	);
}

export { AppBarItems };
