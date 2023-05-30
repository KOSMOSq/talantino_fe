import {
    Badge,
    Box,
    ClickAwayListener,
    Grow,
    IconButton,
    List,
    Paper,
    Popper,
    Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJsClient from "react-stomp";
import { useLocation } from "react-router-dom";
import { renewTalentProofThunk } from "../../../../redux/reducers/talentsProofsReducer";
import { renewProofThunk } from "../../../../redux/reducers/proofsReducer";
import { KudosNotification } from "./components/KudosNotification";
import { setMessage } from "../../../../redux/reducers/appReducer";
import { notificationsAPI } from "../../../../api/notificationsAPI";
import InfiniteScroll from "react-infinite-scroll-component";

const SOCKET_URL = process.env.REACT_APP_API_URL + "/ws";
const SIZE = 5;

const NotificationCenter = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(-1);
    const [readIds, setReadIds] = useState([]);

    const bellButtonRef = useRef();
    const notificationsRef = useRef();

    const email = useSelector(store => store.auth.user.email);
    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    const location = useLocation();

    const onConnected = () => {};

    const handlePop = () => {
        setAnchorEl(prev => (prev ? null : bellButtonRef.current));
    };

    const onMessageReceived = msg => {
        if (location.pathname.split("/")[1] === "proofs") {
            dispatch(renewProofThunk(msg.proofId));
        } else if (location.pathname.split("/")[1] === "talent") {
            dispatch(renewTalentProofThunk(msg.proofId));
        }
        dispatch(
            setMessage("You recieved a notification! ", "info", handlePop)
        );
        setNotifications(prev => [msg, ...prev]);
        setCount(prev => (prev += 1));
    };

    const handleClickAway = e => {
        if (e.target.dataset.tag === "NoClickAway") {
            return;
        }
        if (anchorEl !== null) {
            const readNotification = async id => {
                await notificationsAPI.readNotification(id, token);
                setCount(prevCount => prevCount - 1);
            };

            readIds.forEach(id => {
                readNotification(id).catch(err =>
                    dispatch(
                        setMessage(
                            err.response?.data.message
                                ? err.response.data.message
                                : "Network error",
                            "error"
                        )
                    )
                );
            });

            setReadIds(prev => []);
            setAnchorEl(prev => null);
        }
    };

    const getNotifications = async () => {
        const response = await notificationsAPI.getNotifications(
            page,
            SIZE,
            token
        );
        if (totalPages === -1) {
            setTotalPages(Math.ceil(response.totalAmount / SIZE));
            setCount(response.unreadAmount);
        }
        setNotifications(prev => [...prev, ...response.notifications]);
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        getNotifications().catch(err =>
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            )
        );
    }, []);

    const onHoverNotification = e => {
        const targetId = e.currentTarget.dataset.id;
        setNotifications(prev => {
            const newArr = [];
            const newReadIds = [];
            prev.forEach(item => {
                if (Number(targetId) === item.id && !item.read) {
                    newReadIds.push(item.id);
                    newArr.push({
                        ...item,
                        read: true
                    });
                } else {
                    newArr.push(item);
                }
            });
            if (newReadIds.length > 0) {
                setReadIds(prev => [...prev, ...newReadIds]);
                return newArr;
            } else {
                return prev;
            }
        });
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
                        <Badge badgeContent={count} color="primary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Popper
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        transition
                    >
                        {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: "top"
                                }}
                                timeout={200}
                            >
                                <Paper elevation={3} sx={{ zIndex: 2 }}>
                                    <List
                                        id="notificationsScroll"
                                        sx={{
                                            width: "100%",
                                            bgcolor: "background.paper",
                                            maxHeight: "350px",
                                            minHeight: "90px",
                                            maxWidth: "316px",
                                            overflow: "auto",
                                            borderRadius: "6px",
                                            "::-webkit-scrollbar": {
                                                width: "8px"
                                            },
                                            "::-webkit-scrollbar-track": {
                                                borderRadius: "4px"
                                            },
                                            "::-webkit-scrollbar-thumb": {
                                                backgroundColor:
                                                    "rgba(0,0,0,.3)",
                                                borderRadius: "4px"
                                            }
                                        }}
                                    >
                                        <InfiniteScroll
                                            dataLength={notifications.length}
                                            hasMore={page < totalPages}
                                            next={getNotifications}
                                            scrollableTarget="notificationsScroll"
                                            ref={notificationsRef}
                                        >
                                            {notifications.length <= 0 ? (
                                                <Typography
                                                    sx={{
                                                        color: "gray",
                                                        textAlign: "center",
                                                        mt: "32px",
                                                        width: "316px"
                                                    }}
                                                >
                                                    No notifications
                                                </Typography>
                                            ) : (
                                                notifications.map(
                                                    (item, index) => (
                                                        <KudosNotification
                                                            onHoverNotification={
                                                                onHoverNotification
                                                            }
                                                            key={index}
                                                            {...item}
                                                        />
                                                    )
                                                )
                                            )}
                                        </InfiniteScroll>
                                    </List>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
            </ClickAwayListener>
        </>
    );
};

export { NotificationCenter };
