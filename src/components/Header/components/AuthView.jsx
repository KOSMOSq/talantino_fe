import { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { testTalent } from "../../../common/common";

// import { useNavigate } from "react-router";

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

	// const navigate = useNavigate();

	// const handleClick = () => {
	// 	navigate(`/login`);
	// };

	return (
		<>
			{login === true ? (
				<IconButton sx={btnStyle} onClick={handleLog}>
					<Avatar alt={testTalent.surname} src={testTalent.profilePicture} />
				</IconButton>
			) : (
				<Button sx={btnStyle} onClick={handleLog}>
					Login
				</Button>
			)}
		</>
	);
}

export { AuthView };
