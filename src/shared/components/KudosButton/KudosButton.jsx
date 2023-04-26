import { useState } from "react";
import {
    Box,
    ClickAwayListener,
    IconButton,
    Popper,
    Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { useNavigate } from "react-router-dom";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import kudosIconInactive from "../../../assets/icons/kudosIconInactive.svg";
import { KudosPopper } from "./components/KudosPopper";
import { setMessage } from "../../../redux/reducers/appReducer";
import { getAuthThunk } from "../../../redux/reducers/authReducer";

const KudosButton = ({ id, isKudosed, totalKudos }) => {
    const [kudosed, setKudosed] = useState(isKudosed);
    const [counter, setCounter] = useState(totalKudos);
    const [anchorEl, setAnchorEl] = useState(null);
    const [kudosAmount, setKudosAmount] = useState(1);

    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);
    const role = useSelector(store => store.auth.user.role);
    const balance = useSelector(store => store.auth.user.balance);

    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKudos = async () => {
        try {
            await kudosAPI.sendKudos(id, token, kudosAmount);
            dispatch(getAuthThunk());
            setAnchorEl(null);
            setKudosed(true);
            setCounter(prev => prev + kudosAmount);
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
                    <Popper
                        id={idPop}
                        open={open}
                        anchorEl={anchorEl}
                        placement="bottom"
                    >
                        <KudosPopper
                            balance={balance}
                            kudosAmount={kudosAmount}
                            setKudosAmount={setKudosAmount}
                            handleKudos={handleKudos}
                        />
                    </Popper>

                    <Box display="flex" flexDirection="row" alignItems="center">
                        <IconButton
                            aria-describedby={idPop}
                            onClick={handlePop}
                            disabled={role === "TALENT"}
                            size="small"
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
                            title={counter}
                        >
                            {formatter.format(counter)}
                        </Typography>
                    </Box>
                </Box>
            </ClickAwayListener>
        </>
    );
};

export { KudosButton };
