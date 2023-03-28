import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../../../redux/reducers/authReducer";
import { Link, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const btnStyle = {
	marginLeft: "auto",
	right: 40,
	fontSize: 20,
	color: "grey",
};

function AuthView() {
	const dispatch = useDispatch();
	const avatar = useSelector((store) => store.auth.avatar);
	const name = useSelector((store) => store.auth.name);
	const isAuth = useSelector((store) => store.auth.isAuth);

	const handleLog = () => {
		dispatch(clearData());
		localStorage.clear();
		navigate(`/talents`);
	};

	const navigate = useNavigate();
	const handleClickLogin = () => {
		navigate(`/login`);
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{isAuth === true ? (
				<>
					<Typography sx={btnStyle}>
						Hi, {name}
						<IconButton
							onClick={handleClick}
							aria-controls={open ? "account-menu" : undefined}
							aria-expanded={open ? "true" : undefined}
						>
							<Avatar
								sx={{ width: 50, height: 50 }}
								alt={name}
								src={avatar || "error"}
							/>
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 28,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<AccountCircleIcon fontSize="small" />
								</ListItemIcon>
								<Link
									onClick={() => {
										navigate(`/profile`);
									}}
								>
									Profile
								</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								<Link onClick={handleLog}>Logout</Link>
							</MenuItem>
						</Menu>
					</Typography>
				</>
			) : (
				<Button
					sx={{ marginLeft: "auto", right: 40, fontSize: 20 }}
					onClick={(handleLog, handleClickLogin)}
				>
					Login
				</Button>
			)}
		</>
	);
}

export { AuthView };
