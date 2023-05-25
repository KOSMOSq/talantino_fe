import { useEffect, useState } from "react";
import {
    Box,
    ClickAwayListener,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
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
import { renewProofThunk } from "../../../redux/reducers/proofsReducer";
import { renewTalentProofThunk } from "../../../redux/reducers/talentsProofsReducer";

const KudosButton = ({
    id,
    isKudosed,
    totalKudos,
    totalKudosFromSponsor,
    authorId,
    alignRight = false,
    skillsAmount = 0,
    clikedFrom
}) => {
    const defaultKudosAmount = skillsAmount !== 0 ? skillsAmount : 1;
    const [kudosed, setKudosed] = useState(isKudosed);
    const [sponsorKudoses, setSponsorKudoses] = useState(totalKudosFromSponsor);
    const [counter, setCounter] = useState(totalKudos);
    const [anchorEl, setAnchorEl] = useState(null);
    const [kudosAmount, setKudosAmount] = useState(defaultKudosAmount);

    useEffect(() => {
        setCounter(totalKudos);
    }, [totalKudos]);

    useEffect(() => {
        setSponsorKudoses(totalKudosFromSponsor);
    }, [totalKudosFromSponsor]);

    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);
    const role = useSelector(store => store.auth.user.role);
    const authId = useSelector(store => store.auth.user.id);
    const balance = useSelector(store => store.auth.user.balance);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const handleKudos = async () => {
        try {
            await kudosAPI.sendKudos(id, token, kudosAmount);
            dispatch(getAuthThunk());
            if (location.pathname.split("/")[1] === "proofs") {
                dispatch(renewProofThunk(id));
            } else {
                dispatch(renewTalentProofThunk(id));
            }
            dispatch(
                setMessage(`${kudosAmount} kudos sent successfully`, "success")
            );
            setKudosAmount(defaultKudosAmount);
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
        } else if (balance === 0 || balance < skillsAmount) {
            dispatch(setMessage("You have to top up your balance", "error"));
            return;
        }
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
        setTimeout(() => {
            setKudosAmount(defaultKudosAmount);
        }, 350);
    };

    const open = Boolean(anchorEl);
    const idPop = open ? "kudosPopper" : undefined;

    const kudosNumber =
        role === "TALENT" && authId === Number(authorId) ? (
            <DialogOfSponsors
                counter={counter}
                formatter={formatter}
                id={id}
                token={token}
            />
        ) : (
            <Tooltip
                title={`${counter}${
                    sponsorKudoses !== null
                        ? `, ${sponsorKudoses} given by you`
                        : ""
                }`}
                arrow
                enterDelay={300}
                enterNextDelay={300}
                leaveDelay={100}
                placement={alignRight ? "right" : "bottom"}
            >
                <Typography component="div" sx={{ cursor: "default" }}>
                    {formatter.format(counter)}
                </Typography>
            </Tooltip>
        );

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <KudosPopper
                        idPop={idPop}
                        open={open}
                        anchorEl={anchorEl}
                        balance={balance}
                        skillsAmount={skillsAmount}
                        clikedFrom={clikedFrom}
                        kudosAmount={kudosAmount}
                        setKudosAmount={setKudosAmount}
                        handleKudos={handleKudos}
                    />
                    <Box
                        display="flex"
                        flexDirection="rows"
                        alignItems="center"
                    >
                        {alignRight ? null : kudosNumber}
                        <IconButton
                            aria-describedby={idPop}
                            onClick={handlePop}
                            disabled={role === "TALENT"}
                            size="small"
                            sx={{
                                [":disabled"]: {
                                    pointerEvents: "all"
                                }
                            }}
                        >
                            <Tooltip
                                title={
                                    isAuth
                                        ? role !== "SPONSOR"
                                            ? "You have to be a sponsor to send kudos"
                                            : ""
                                        : "Log in to send kudos"
                                }
                                arrow
                                enterDelay={400}
                                enterNextDelay={400}
                                leaveDelay={200}
                                disableInteractive
                            >
                                {role === "TALENT" || kudosed ? (
                                    <img src={kudosIconActive} alt="Kudos" />
                                ) : (
                                    <img src={kudosIconInactive} alt="Kudos" />
                                )}
                            </Tooltip>
                        </IconButton>
                        {alignRight ? kudosNumber : null}
                    </Box>
                </Box>
            </ClickAwayListener>
        </>
    );
};

export { KudosButton };
