import { Box, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkillChip } from "../../../../../../shared/components/SkillChip/SkillChip";
import { TalentProof } from "../TalentProofArea/components/TalentProof";
import kudosIconActive from "../../../../../../assets/icons/kudosIconActive.svg";
import { useEffect, useState } from "react";
import { setMessage } from "../../../../../../redux/reducers/appReducer";
import { talentsAPI } from "../../../../../../api/talentsAPI";

const recievedInfo = {
    skill: {
        id: 2,
        label: "Leadership",
        icon: "https://olha-team-backend.s3.amazonaws.com/icons/HowToVoteIcon.svg"
    },
    proof: {
        id: 4,
        date: "2023-05-16T14:47:06.525759",
        title: "Did you know that the US's most advanced fighter jet is the F-22 Raptor?",
        description:
            "This plane is just a piece of art in the sky! Developed in Skunk Works - Advanced Development Programs department of Lockheed Martin. It was introduced to the public in 2005. It is an incredible stealth aircraft capable of completing the hardest missions in the US Air Force duty. Every piece of it is near the perfect, every panel has an curved lines so the enemy radars cannot see the plane from a far distance. You will not find any two surfaces of the plane that create an 90 degree angle! It is not impossible to detect an aircraft in the sky, it will be detected no matter what, but for the enemy it can be too late. Also advanced radar systems are capable of detecting launches of ballistic missiles from as far as 1200 kilometers and in an automatic mode transfer precise coordinates of those launches to the AWACS. Two engines of the plane can push it to speeds over Mach 1,5! All the carrying weapons are hidden in the fuselage, so the rockets are not reflecting radar signals. There is a plenty more to say about F-22, but this information should be enough to you to be interested in reading about it more on the internet! Thank you for your attention!",
        authorId: 8,
        status: "PUBLISHED",
        totalKudos: 2323,
        totalKudosFromSponsor: null,
        isKudosed: false,
        skills: [
            {
                id: 18,
                label: "Analytical skills",
                icon: "https://olha-team-backend.s3.amazonaws.com/icons/InsightsIcon.svg",
                totalKudos: 353,
                totalKudosFromSponsor: null,
                isKudosed: false
            }
        ]
    }
};

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
                //const response = await talentsAPI.getStats(id, token);
                //setStats(response);
                setStats(recievedInfo);
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
                        <SkillChip {...stats.skill} />
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
                    <TalentProof {...stats.proof} />
                </Grid>
            </Grid>
        </>
    );
};

export { TalentStats };
