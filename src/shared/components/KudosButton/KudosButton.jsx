import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import kudosIconInactive from "../../../assets/icons/kudosIconInactive.svg";
import { setMessage } from "../../../redux/reducers/appReducer";
import { getAuthThunk } from "../../../redux/reducers/authReducer";
import { DialogOfSponsors } from "./components/DialogOfSponsors";
import { kudosAPI } from "../../../api/kudosAPI";

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

    const token = useSelector(store => store.auth.token);
    const isAuth = useSelector(store => store.auth.isAuth);
    const page = useSelector(store => store.proofs.currentPage);
    const role = useSelector(store => store.auth.user.role);
    const authId = useSelector(store => store.auth.user.id);
    const location = useLocation();
    const from = location.state?.from;

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
            dispatch(getAuthThunk());
            setKudosed(true);
            setCounter(prev => prev + 1);
            setSponsorKudoses(prev => prev + 1);
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
                {role === "TALENT" &&
                authId === authorId &&
                from === "profile-click" ? (
                    <DialogOfSponsors
                        counter={counter}
                        formatter={formatter}
                        sponsorKudoses={sponsorKudoses}
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
        </>
    );
};

export { KudosButton };
