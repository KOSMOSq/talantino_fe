import {
    Box,
    Chip,
    ClickAwayListener,
    ThemeProvider,
    Tooltip,
    Typography
} from "@mui/material";
import theme from "../../themes/skillsTheme";
import { useState } from "react";
import { formatter } from "../../utils/numberFormatter";
import { useDispatch, useSelector } from "react-redux";
import { KudosPopper } from "../KudosButton/components/KudosPopper";
import { kudosAPI } from "../../../api/kudosAPI";
import { getAuthThunk } from "../../../redux/reducers/authReducer";
import { setMessage } from "../../../redux/reducers/appReducer";
import { renewProofThunk } from "../../../redux/reducers/proofsReducer";
import { renewTalentProofThunk } from "../../../redux/reducers/talentsProofsReducer";
import { useLocation, useParams } from "react-router-dom";

const SkillChip = ({
    id,
    proofId,
    icon,
    label,
    totalKudos,
    totalKudosFromSponsor,
    forTalent = false
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [kudosAmount, setKudosAmount] = useState(1);

    const role = useSelector(store => store.auth.user.role);
    const balance = useSelector(store => store.auth.user.balance);
    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    const location = useLocation();

    const handleKudos = async () => {
        try {
            await kudosAPI.sendKudosToSkill(proofId, id, kudosAmount, token);
            dispatch(getAuthThunk());
            dispatch(
                setMessage(`${kudosAmount} kudos sent successfully`, "success")
            );
            if (location.pathname.split("/")[1] === "proofs") {
                dispatch(renewProofThunk(proofId));
            } else {
                dispatch(renewTalentProofThunk(proofId));
            }
            setAnchorEl(null);
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

    const handleClickAway = () => {
        setAnchorEl(null);
        setTimeout(() => {
            setKudosAmount(1);
        }, 350);
    };

    const handlePop = event => {
        if (balance === 0) {
            dispatch(setMessage("You have to top up your balance", "error"));
            return;
        }
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const idPop = open ? "kudosPopper" : undefined;

    return (
        <>
            <ThemeProvider theme={theme}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box>
                        <Tooltip
                            title={`${
                                forTalent
                                    ? ""
                                    : role === "SPONSOR"
                                    ? totalKudos +
                                      ", " +
                                      (totalKudosFromSponsor
                                          ? totalKudosFromSponsor
                                          : 0) +
                                      " given by you"
                                    : totalKudos
                            }`}
                            arrow
                            enterDelay={200}
                            enterNextDelay={100}
                            leaveDelay={100}
                            placement="top"
                        >
                            <Chip
                                onClick={
                                    forTalent || role === "TALENT"
                                        ? null
                                        : handlePop
                                }
                                icon={
                                    <img
                                        src={icon}
                                        width="18"
                                        alt="skill"
                                        style={{
                                            filter:
                                                theme.palette[label]
                                                    ?.contrastText !== "#000"
                                                    ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)"
                                                    : "invert(0%) sepia(0%) saturate(9%) hue-rotate(207deg) brightness(94%) contrast(105%)"
                                        }}
                                    />
                                }
                                label={
                                    <Typography variant="span">
                                        {label}
                                        {forTalent ? null : (
                                            <Typography variant="span">
                                                {" • " +
                                                    formatter.format(
                                                        totalKudos
                                                    )}
                                            </Typography>
                                        )}
                                    </Typography>
                                }
                                size="small"
                                color={theme.palette[label] ? label : "info"}
                            />
                        </Tooltip>
                        <KudosPopper
                            idPop={idPop}
                            open={open}
                            anchorEl={anchorEl}
                            balance={balance}
                            clikedFrom={"skill"}
                            kudosAmount={kudosAmount}
                            setKudosAmount={setKudosAmount}
                            handleKudos={handleKudos}
                        />
                    </Box>
                </ClickAwayListener>
            </ThemeProvider>
        </>
    );
};

export { SkillChip };
