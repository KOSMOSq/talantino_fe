import { Box, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkillChip } from "../../../../../../shared/components/SkillChip/SkillChip";
import { TalentProof } from "../TalentProofArea/components/TalentProof";
import kudosIconActive from "../../../../../../assets/icons/kudosIconActive.svg";
import { useEffect, useState } from "react";
import { setMessage } from "../../../../../../redux/reducers/appReducer";
import { talentsAPI } from "../../../../../../api/talentsAPI";

const TalentStats = ({ talentId }) => {
    const id = useSelector(store => store.auth.user.id);
    const role = useSelector(store => store.auth.user.role);
    const token = useSelector(store => store.auth.token);
    const balance = useSelector(store => store.auth.user.balance);
    const dispatch = useDispatch();

    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (Number(talentId) === id && role === "TALENT") {
            const getStats = async () => {
                const response = await talentsAPI.getStats(id, token);
                setStats(response);
            };

            getStats().catch(err =>
                dispatch(
                    setMessage(
                        err.response?.data.message
                            ? err.response.data.message
                            : "Network error",
                        "error"
                    )
                )
            );
        }
    }, []);

    if (Number(talentId) !== id || role !== "TALENT") {
        return <Navigate to={`/talent/${talentId}/`} />;
    } else if (!stats) {
        return <LinearProgress />;
    }

    return (
        <>
            <Grid container rowGap={1} sx={{ mt: 1 }}>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                        Recieved kudos
                    </Typography>
                    <Typography
                        component="span"
                        sx={{ fontSize: "18px", fontWeight: "bold" }}
                        display="flex"
                        gap={0.5}
                        justifyContent="center"
                    >
                        {balance}
                        <img
                            src={kudosIconActive}
                            alt="kudos icon"
                            width="22"
                        />
                    </Typography>
                    <Divider
                        orientation="vertical"
                        sx={{
                            borderRightWidth: 5,
                            mt: "-48px",
                            height: "44px"
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{ width: "100%", alignItems: "center" }}
                    >
                        <Typography
                            sx={{ fontSize: "18px", fontWeight: "500" }}
                        >
                            Most kudosed skill
                        </Typography>
                        {stats.skill ? (
                            <SkillChip {...stats.skill} />
                        ) : (
                            <Typography sx={{ color: "gray" }}>
                                Nobody has kudosed your skills yet
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider
                        sx={{
                            borderBottomWidth: 5,
                            width: "96%",
                            mr: "auto",
                            ml: "auto"
                        }}
                    />
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: "500",
                            mt: "8px",
                            mb: "6px"
                        }}
                    >
                        Most kudosed proof{" "}
                    </Typography>
                    {stats.proof ? (
                        <TalentProof {...stats.proof} />
                    ) : (
                        <Typography sx={{ color: "gray", textAlign: "center" }}>
                            Nobody has kudosed your proofs yet
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export { TalentStats };
