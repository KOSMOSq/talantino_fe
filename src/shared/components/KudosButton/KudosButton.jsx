import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { useNavigate } from "react-router-dom";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import kudosIconInactive from "../../../assets/icons/kudosIconInactive.svg";
import { setMessage } from "../../../redux/reducers/appReducer";

const KudosButton = ({ id, isKudosed, totalKudos }) => {
    const [kudosed, setKudosed] = useState(isKudosed);
    const [counter, setCounter] = useState(totalKudos);

    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);
    const role = useSelector(store => store.auth.user.role);

    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKudos = async () => {
        if (!isAuth) {
            navigate("/login", {
                state: { from: "proofs", page }
            });
            return;
        }
        try {
            await kudosAPI.sendKudos(id, token);
            setKudosed(true);
            setCounter(prev => prev + 1);
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

    return (
        <>
            <Box display="flex" flexDirection="rows" alignItems="center">
                <IconButton
                    onClick={handleKudos}
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
        </>
    );
};

export { KudosButton };
