import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { useNavigate } from "react-router-dom";

const KudosButton = ({ id, isKudosed, totalKudos }) => {
    const [kudosed, setKudosed] = useState(isKudosed);
    const [counter, setCounter] = useState(totalKudos);
    
    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);

    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const navigate = useNavigate();

    const handleKudos = async () => {
        if (!isAuth) {
            navigate("/login", {
                state: { from: "proofs", page }
            });
            return;
        } else if (kudosed) {
            return;
        }
        await kudosAPI.sendKudos(id, token);
        setKudosed(true);
        setCounter(prev => prev + 1);
    };

    return (
        <>
            <Box display="flex" flexDirection="rows" alignItems="center">
                <IconButton onClick={handleKudos} disabled={kudosed}>
                    {kudosed ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
                <Typography component="span" sx={{ cursor: "default" }} title={counter}>
                    {formatter.format(counter)}
                </Typography>
            </Box>
        </>
    );
};

export { KudosButton };
