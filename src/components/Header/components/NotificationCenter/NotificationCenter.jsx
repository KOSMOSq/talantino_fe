import {
    Badge,
    Box,
    ClickAwayListener,
    IconButton,
    Paper,
    Popper,
    Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJsClient from "react-stomp";
import { useLocation } from "react-router-dom";
import { renewTalentProofThunk } from "../../../../redux/reducers/talentsProofsReducer";
import { renewProofThunk } from "../../../../redux/reducers/proofsReducer";
import { KudosNotification } from "./components/KudosNotification";
import { setMessage } from "../../../../redux/reducers/appReducer";

const SOCKET_URL = process.env.REACT_APP_API_URL + "/ws";

const NotificationCenter = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);

    const bellButtonRef = useRef();

    const email = useSelector(store => store.auth.user.email);
    const dispatch = useDispatch();

    const location = useLocation();

    const onConnected = () => {};
    
    const handlePop = () => {
        setAnchorEl(prev => (prev ? null : bellButtonRef.current));
        setCount(prev => 0);
    };

    const onMessageReceived = msg => {
        if (location.pathname.split("/")[1] === "proofs") {
            dispatch(renewProofThunk(msg.proofId));
        } else if (location.pathname.split("/")[1] === "talent") {
            dispatch(renewTalentProofThunk(msg.proofId));
        }
        dispatch(setMessage("You recieved a notification! ", "info", handlePop));
        setNotifications(prev => [msg, ...prev]);
        setCount(prev => prev += 1);
    };

    const handleClickAway = (e) => {
        if (e.target.dataset.tag === "NoClickAway") {
            return;
        }
        setAnchorEl(prev => null);
    };

    return (
        <>
            <SockJsClient
                url={SOCKET_URL}
                topics={[`/user/${email}/queue/kudos`]}
                onConnect={onConnected}
                onMessage={onMessageReceived}
                debug={false}
            />
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <IconButton onClick={handlePop} ref={bellButtonRef}>
                        <Badge
                            badgeContent={count}
                            color="primary"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                        <Paper
                            elevation={3}
                            sx={{
                                maxHeight: "360px",
                                minHeight: "90px",
                                width: "296px",
                                overflow: "auto",
                                "::-webkit-scrollbar": {
                                    width: "8px"
                                },
                                "::-webkit-scrollbar-track": {
                                    borderRadius: "4px"
                                },
                                "::-webkit-scrollbar-thumb": {
                                    backgroundColor: "rgba(0,0,0,.3)",
                                    borderRadius: "4px"
                                }
                            }}
                            placement="bottom"
                        >
                            {notifications.length <= 0 ? (
                                <Typography
                                    sx={{
                                        color: "gray",
                                        textAlign: "center",
                                        mt: "32px"
                                    }}
                                >
                                    No notifications
                                </Typography>
                            ) : (
                                notifications.map((item, index) => (
                                    <KudosNotification key={index} {...item} />
                                ))
                            )}
                        </Paper>
                    </Popper>
                </Box>
            </ClickAwayListener>
        </>
    );
};

export { NotificationCenter };
