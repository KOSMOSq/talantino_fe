import { useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { testTalent } from "../../../common/common";

const btnStyle = {
	position: "fixed",
	alignContent: "center",
	right: 40,
	fontSize: 20,
};

function AuthView() {
	const [login, setLogin] = useState(true);

	const handleLog = () => {
		setLogin((prev) => !prev);
	};
	return (
		<>
			{login === true ? (
				<IconButton sx={btnStyle} onClick={handleLog}>
					<Avatar alt={testTalent.surname} src={testTalent.profilePicture} />
				</IconButton>
			) : (
				<Typography sx={btnStyle} onClick={handleLog}>
					Login
				</Typography>
			)}
		</>
	);
}

export { AuthView };
