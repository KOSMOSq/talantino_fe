import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Link, ListItemIcon, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Menu } from "../../../../shared/components/Menu/Menu";
import { NotificationCenter } from "../NotificationCenter/NotificationCenter";
import { clearDataThunk } from "../../../../redux/reducers/authReducer";
import SponsorKudos from "./components/SponsorKudos/SponsorKudos";
import { Greetings } from "./components/Greetings/Greetings";

function AuthView() {
    const dispatch = useDispatch();
    const avatar = useSelector(store => store.auth.user.avatar);
    const name = useSelector(store => store.auth.user.name);
    const role = useSelector(store => store.auth.user.role);
    const isAuth = useSelector(store => store.auth.isAuth);
    const id = useSelector(store => store.auth.user.id);
    const balance = useSelector(store => store.auth.user.balance);

    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate(`/login`);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        dispatch(clearDataThunk());
        navigate(`/talents`);
    };

    const handleClickProfile = e => {
        handleClose();
        e.preventDefault();
        navigate(
            `/${
                role === "SPONSOR"
                    ? "sponsor"
                    : role === "TALENT"
                    ? "talent"
                    : "notFound"
            }/${id}`
        );
    };

    const handleClickSettings = e => {
        handleClose();
        e.preventDefault();
        navigate(`/settings`);
    };

    return (
        <>
            {isAuth ? (
                <>
                    <Box marginLeft="auto" display="flex" alignItems="center">
                        {role === "SPONSOR" ? (
                            <SponsorKudos balance={balance} />
                        ) : role !== "ADMIN" ? (
                            <NotificationCenter />
                        ) : null}
                        <Greetings name={name} avatar={avatar} open={open} handleClick={handleClick}/>
                        <Menu
                            open={open}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            transformOrigin="right top"
                        >
                            {role !== "ADMIN" ? (
                                <MenuItem onClick={handleClickProfile}>
                                    <Link
                                        sx={{
                                            textDecoration: "none",
                                            display: "flex"
                                        }}
                                        href={`/${
                                            role === "SPONSOR"
                                                ? "sponsor"
                                                : role === "TALENT"
                                                ? "talent"
                                                : "notFound"
                                        }/${id}`}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                alignSelf: "center"
                                            }}
                                        >
                                            <AccountCircleIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "#1976d2"
                                                }}
                                            />
                                        </ListItemIcon>
                                        Profile
                                    </Link>
                                </MenuItem>
                            ) : null}
                            {role !== "ADMIN" ? (
                                <MenuItem onClick={handleClickSettings}>
                                    <Link
                                        sx={{
                                            textDecoration: "none",
                                            display: "flex"
                                        }}
                                        href="/settings"
                                    >
                                        <ListItemIcon
                                            sx={{
                                                alignSelf: "center"
                                            }}
                                        >
                                            <SettingsIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "#1976d2"
                                                }}
                                            />
                                        </ListItemIcon>
                                        Settings
                                    </Link>
                                </MenuItem>
                            ) : null}
                            <MenuItem onClick={handleLogout}>
                                <Link
                                    sx={{
                                        textDecoration: "none",
                                        display: "flex"
                                    }}
                                >
                                    <ListItemIcon sx={{ alignSelf: "center" }}>
                                        <Logout
                                            fontSize="small"
                                            sx={{
                                                color: "#1976d2"
                                            }}
                                        />
                                    </ListItemIcon>
                                    Logout
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </>
            ) : (
                <Button
                    sx={{
                        marginLeft: "auto",
                        right: 40,
                        fontSize: 20,
                        borderRadius: "10px"
                    }}
                    onClick={(handleLogout, handleClickLogin)}
                >
                    Login
                </Button>
            )}
        </>
    );
}

export { AuthView };
