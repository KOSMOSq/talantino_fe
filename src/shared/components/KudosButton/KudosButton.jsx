import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { useNavigate } from "react-router-dom";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import kudosIconInactive from "../../../assets/icons/kudosIconInactive.svg";
import { setMessage } from "../../../redux/reducers/appReducer";

const KudosButton = ({ id, isKudosed, totalKudos, authorId, isAuthor }) => {
    const [kudosed, setKudosed] = useState(isKudosed);
    const [counter, setCounter] = useState(totalKudos);

    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);
    const myId = useSelector(store => store.auth.user.id);

    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const navigate = useNavigate();
    const checkMyProof = authorId === myId;
    const dispatch = useDispatch();

    const handleKudos = async () => {
        if (!isAuth) {
            navigate("/login", {
                state: { from: "proofs", page }
            });
            return;
        } else if (kudosed) {
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
            <Box
                display="flex"
                flexDirection="rows"
                alignItems="center"
                title={isAuthor ? "You can't send kudos to your proof" : ""}
            >
                <IconButton
                    onClick={handleKudos}
                    disabled={kudosed || checkMyProof || isAuthor}
                    size="small"
                >
                    {kudosed ? (
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
