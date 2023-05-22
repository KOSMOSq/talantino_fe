import { Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { proofsAPI } from "../../../../../../../api/proofsAPI";
import { setMessage } from "../../../../../../../redux/reducers/appReducer";

const ProofDescription = ({ isAuth, id, token, description }) => {
    description = description.slice(0, 200);
    const [fullDescription, setFullDescription] = useState("");
    const [showFull, setShowFull] = useState(false);

    const page = useSelector(store => store.proofs.currentPage);
    const dispatch = useDispatch("");

    const navigate = useNavigate();

    const onReadMore = async () => {
        if (!isAuth) {
            navigate("/login", {
                state: { from: "proofs", page }
            });
            return;
        } else if (fullDescription) {
            setShowFull(prev => !prev);
        } else {
            try {
                const response = await proofsAPI.getProof(id, token);
                setFullDescription(prev => response.description);
                setShowFull(prev => true);
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
        }
    };

    return (
        <>
            <Typography
                sx={{
                    fontSize: "16px",
                    overflowWrap: "break-word"
                }}
            >
                {description.length === 200 ? (
                    <>
                        {showFull
                            ? fullDescription + " "
                            : description[199] === " "
                            ? description.slice(0, 199) + "... "
                            : description + "... "}
                        <Typography
                            variant="span"
                            sx={{
                                fontWeight: 400,
                                color: "gray",
                                cursor: "pointer",
                                ":hover": {
                                    textDecoration: "underline"
                                }
                            }}
                            onClick={onReadMore}
                        >
                            {showFull ? "hide" : "read more"}
                        </Typography>
                    </>
                ) : (
                    description
                )}
            </Typography>
        </>
    );
};

export { ProofDescription };
