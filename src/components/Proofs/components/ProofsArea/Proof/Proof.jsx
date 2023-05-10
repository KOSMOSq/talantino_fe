import { Box, Divider, ListItem, Typography } from "@mui/material";
import { getRelativeTime } from "../../../../../shared/functions/getRelativeTime";
import { ProofSkillsArea } from "../../../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";

const Proof = ({ date, title, description, skills, author }) => {
    return (
        <>
            <ListItem>
                <Box width={"100%"}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: 24 }}
                    >
                        {title}
                        <Typography sx={{ fontSize: "10px", color: "#888888" }}>
                            {getRelativeTime(date)}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                overflowWrap: "break-word"
                            }}
                        >
                            {description}
                            {description.length === 200 ? (
                                <Typography
                                    variant="p"
                                    sx={{ fontWeight: 700 }}
                                >
                                    ...
                                </Typography>
                            ) : (
                                ""
                            )}
                        </Typography>
                    </Typography>
                <ProofSkillsArea skills={skills} />
                </Box>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ marginBottom: 2 }} />
        </>
    );
};

export { Proof };
