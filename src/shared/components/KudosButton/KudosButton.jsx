import { useState } from "react";
import { Box, ClickAwayListener, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import kudosIconInactive from "../../../assets/icons/kudosIconInactive.svg";
import { KudosPopper } from "./components/KudosPopper";
import { setMessage } from "../../../redux/reducers/appReducer";
import { getAuthThunk } from "../../../redux/reducers/authReducer";
import { DialogOfSponsors } from "./components/DialogOfSponsors";
import { kudosAPI } from "../../../api/kudosAPI";
import { formatter } from "../../utils/numberFormatter";

const KudosButton = ({
    id,
    isKudosed,
    totalKudos,
    totalKudosFromSponsor,
    authorId
}) => {
    const [kudosed, setKudosed] = useState(isKudosed);
    const [sponsorKudoses, setSponsorKudoses] = useState(totalKudosFromSponsor);
    const [counter, setCounter] = useState(totalKudos);
    const [anchorEl, setAnchorEl] = useState(null);
    const [kudosAmount, setKudosAmount] = useState(1);

    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);
    const role = useSelector(store => store.auth.user.role);
    const authId = useSelector(store => store.auth.user.id);
    const location = useLocation();
    const from = location.state?.from;
    const balance = useSelector(store => store.auth.user.balance);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKudos = async () => {
        try {
            await kudosAPI.sendKudos(id, token, kudosAmount);
            dispatch(getAuthThunk());
            dispatch(
                setMessage(`${kudosAmount} kudos sent successfully`, "success")
            );
            setKudosAmount(1);
            setAnchorEl(null);
            setKudosed(true);
            setCounter(prev => prev + kudosAmount);
            setSponsorKudoses(prev => prev + kudosAmount);
        } catch (err) {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        }
    };

    const handlePop = event => {
        if (!isAuth) {
            navigate("/login", {
                state: { from: "proofs", page }
            });
            return;
        } else if (balance === 0) {
            dispatch(setMessage("You have to top up your balance", "error"));
            return;
        }
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const idPop = open ? "kudosPopper" : undefined;

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <KudosPopper
                        idPop={idPop}
                        open={open}
                        anchorEl={anchorEl}
                        balance={balance}
                        kudosAmount={kudosAmount}
                        setKudosAmount={setKudosAmount}
                        handleKudos={handleKudos}
                    />
                    <Box
                        display="flex"
                        flexDirection="rows"
                        alignItems="center"
                    >
                        <IconButton
                            aria-describedby={idPop}
                            onClick={handlePop}
                            disabled={role === "TALENT"}
                            size="small"
                            title={
                                role !== "SPONSOR"
                                    ? "You need to be a sponsor to send kudos"
                                    : ""
                            }
                            sx={{
                                [":disabled"]: {
                                    pointerEvents: "all"
                                }
                            }}
                        >
                            {role === "TALENT" || kudosed ? (
                                <img src={kudosIconActive} alt="Kudos" />
                            ) : (
                                <img src={kudosIconInactive} alt="Kudos" />
                            )}
                        </IconButton>
                        {role === "TALENT" &&
                        authId === authorId &&
                        from === "profile-click" ? (
                            <DialogOfSponsors
                                counter={counter}
                                formatter={formatter}
                                id={id}
                                token={token}
                            />
                        ) : (
                            <Typography
                                component="div"
                                sx={{ cursor: "default" }}
                                title={`${counter}${
                                    sponsorKudoses !== null
                                        ? `, ${sponsorKudoses} given by you`
                                        : ""
                                }`}
                            >
                                {formatter.format(counter)}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </ClickAwayListener>
            {/* <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <KudosPopper
                        idPop={idPop}
                        open={open}
                        anchorEl={anchorEl}
                        balance={balance}
                        kudosAmount={kudosAmount}
                        setKudosAmount={setKudosAmount}
                        handleKudos={handleKudos}
                    />

                    <Box display="flex" flexDirection="row" alignItems="center">
                        <IconButton
                            aria-describedby={idPop}
                            onClick={handlePop}
                            disabled={role === "TALENT"}
                            size="small"
                            title={
                                role !== "SPONSOR"
                                    ? "You need to be a sponsor to send kudos"
                                    : ""
                            }
                            sx={{
                                [":disabled"]: {
                                    pointerEvents: "all"
                                }
                            }}
                        >
                            {role === "TALENT" || kudosed ? (
                                <img src={kudosIconActive} alt="Kudos" />
                            ) : (
                                <img src={kudosIconInactive} alt="Kudos" />
                            )}
                        </IconButton>
                        <Typography
                            component="span"
                            sx={{ cursor: "default" }}
                            title={`${counter}${
                                sponsorKudoses !== null
                                    ? `, ${sponsorKudoses} given by you`
                                    : ""
                            }`}
                        >
                            {formatter.format(counter)}
                        </Typography>
                    </Box>
                </Box>
            </ClickAwayListener> */}
        </>
    );
};

export { KudosButton };
