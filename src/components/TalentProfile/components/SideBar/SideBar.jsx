import { Box, Avatar, Typography, Chip } from "@mui/material";
import { Links } from "./components/Links/Links";
import { ProofSkillsArea } from "../MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";

function SideBar({ userInfo }) {
    return (
        <Box width={"30%"} paddingTop={"7vh"}>
            <Box
                width="100%"
                sx={{
                    aspectRatio: "1/1",
                    maxHeight: "256px",
                    maxWidth: "256px"
                }}
            >
                <Avatar
                    alt={userInfo.name}
                    src={userInfo.avatar}
                    sx={{
                        width: "100%",
                        height: "100%",
                        marginBottom: 2,
                        fontSize: "94px"
                    }}
                >
                    {userInfo.name.slice(0, 1)}
                </Avatar>
            </Box>

            <Box>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontSize: "24px" }}
                >
                    {`${userInfo.name} ${userInfo.surname}`}
                </Typography>

                {userInfo.role !== "SPONSOR" ? (
                    <>
                        <Chip
                            sx={{
                                fontSize: "20px"
                            }}
                            label={userInfo.kind}
                            color="primary"
                            size="medium"
                        />
                        <Typography
                            variant="h6"
                            component="h6"
                            mt={2}
                            sx={{ fontSize: "18px", color: "#888888" }}
                        >
                            {userInfo.location}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "18px", color: "#888888" }}
                        >
                            {userInfo.experience
                                ? `${userInfo.experience} year experience`
                                : null}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "18px", color: "#888888" }}
                        >
                            {userInfo.email}
                        </Typography>
                        {userInfo.skills ? (
                            <ProofSkillsArea skills={userInfo.skills} />
                        ) : null}
                        <Links talentLinks={userInfo.links} />
                    </>
                ) : userInfo.role === "SPONSOR" ? (
                    <Box display="flex" flexDirection="column">
                        <Typography sx={{ color: "gray" }}>STATS</Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            Balance:{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: "bold" }}
                            >
                                {userInfo.balance} kudos
                            </Typography>
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            Total kudosed:{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: "bold" }}
                            >
                                {userInfo.totalKudosed} proofs
                            </Typography>
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            Total spent:{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: "bold" }}
                            >
                                {userInfo.totalSpent} kudos
                            </Typography>
                        </Typography>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
}

export { SideBar };
