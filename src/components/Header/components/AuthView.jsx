import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearDataThunk } from "../../../redux/reducers/authReducer";
import {
    Box,
    Divider,
    Link,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import { formatter } from "../../../shared/utils/numberFormatter";

function AuthView() {
    const dispatch = useDispatch();
    const avatar = useSelector(store => store.auth.user.avatar);
    const name = useSelector(store => store.auth.user.name);
    const role = useSelector(store => store.auth.user.role);
    const isAuth = useSelector(store => store.auth.isAuth);
    const id = useSelector(store => store.auth.user.id);
    const balance = useSelector(store => store.auth.user.balance);

    const handleLogout = () => {
        dispatch(clearDataThunk());
        navigate(`/talents`);
    };

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

    return (
        <>
            {isAuth ? (
                <>
                    {role === "SPONSOR" ? (
                        <>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                sx={{ marginLeft: "auto", marginRight: "16px" }}
                            >
                                <Typography sx={{ color: "gray" }}>
                                    Balance
                                </Typography>
                                <Tooltip title={balance} enterDelay={400} enterNextDelay={400}>
                                    <Typography
                                        sx={{ fontWeight: "bold" }}
                                        display="flex"
                                        gap={0.5}
                                    >
                                        {formatter.format(balance)}
                                        <img
                                            src={kudosIconActive}
                                            alt="kudos icon"
                                            width="22"
                                        />
                                    </Typography>
                                </Tooltip>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                        </>
                    ) : null}
                    <Typography
                        sx={{
                            marginLeft: role === "SPONSOR" ? "16px" : "auto",
                            right: 40,
                            fontSize: 20,
                            color: "grey"
                        }}
                    >
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
                                        transform:
                                            "translateY(-50%) rotate(45deg)",
                                        zIndex: 0
                                    }
                                }
                            }}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top"
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom"
                            }}
                        >
                            <MenuItem onClick={handleClose}>
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
                                    onClick={e => {
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
                                    }}
                                >
                                    <ListItemIcon sx={{ alignSelf: "center" }}>
                                        <AccountCircleIcon fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    sx={{
                                        textDecoration: "none",
                                        display: "flex"
                                    }}
                                    href="/settings"
                                    onClick={e => {
                                        e.preventDefault();
                                        navigate(`/settings`);
                                    }}
                                >
                                    <ListItemIcon sx={{ alignSelf: "center" }}>
                                        <SettingsIcon fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    onClick={handleLogout}
                                    sx={{
                                        textDecoration: "none",
                                        display: "flex"
                                    }}
                                >
                                    <ListItemIcon sx={{ alignSelf: "center" }}>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Typography>
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
