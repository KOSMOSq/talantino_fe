import { Box, Divider, ListItem, Typography } from "@mui/material";
import { getRelativeTime } from "../../../../../shared/functions/getRelativeTime";
import { KudosButton } from "../../../../../shared/components/KudosButton/KudosButton";
import { ProofSkillsArea } from "../../../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";

const Proof = ({
    id,
    date,
    title,
    description,
    skills,
    isKudosed,
    totalKudos,
    totalKudosFromSponsor,
    author
}) => {
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
                <KudosButton
                    id={id}
                    isKudosed={isKudosed}
                    totalKudos={totalKudos}
                    totalKudosFromSponsor={totalKudosFromSponsor}
                />
            </ListItem>
            <Divider variant="middle" component="li" sx={{ marginBottom: 2 }} />
        </>
    );
};

export { Proof };
