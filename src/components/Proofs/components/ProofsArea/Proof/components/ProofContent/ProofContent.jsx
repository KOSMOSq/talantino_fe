import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import { ProofDescription } from "../ProofDescription.jsx/ProofDescription";
import { ProofSkillsArea } from "../../../../../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";
import { KudosButton } from "../../../../../../../shared/components/KudosButton/KudosButton";

const ProofContent = ({
    isAuth,
    isLoading,
    title,
    id,
    token,
    description,
    skills,
    isKudosed,
    totalKudos,
    totalKudosFromSponsor
}) => {
    return (
        <Box display="flex">
            <Box width="100%">
                <Tooltip
                    title={isAuth ? "" : "Log in to see proof's author"}
                    placement="left"
                    arrow
                    enterDelay={1000}
                    enterNextDelay={1000}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: 24
                        }}
                    >
                        {!isLoading ? (
                            title
                        ) : (
                            <Skeleton width="70%" height="38px" />
                        )}
                    </Typography>
                </Tooltip>
                {!isLoading ? (
                    <ProofDescription
                        isAuth={isAuth}
                        id={id}
                        token={token}
                        description={description}
                    />
                ) : (
                    <Skeleton variant="rounded" width="100%" height={100} />
                )}
                {!isLoading ? (
                    <ProofSkillsArea skills={skills} proofId={id} />
                ) : (
                    <>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            sx={{
                                width: "100%",
                                marginTop: "8px"
                            }}
                            gap={0.8}
                        >
                            {Array(4)
                                .fill("")
                                .map((item, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rounded"
                                        width={99}
                                        height={24}
                                        sx={{
                                            borderRadius: "16px"
                                        }}
                                    />
                                ))}
                        </Box>
                    </>
                )}
                <Box
                    sx={{
                        alignSelf: "center",
                        marginTop: "4px",
                        marginLeft: "-10px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    {!isLoading ? (
                        <KudosButton
                            id={id}
                            isKudosed={isKudosed}
                            totalKudos={totalKudos}
                            totalKudosFromSponsor={totalKudosFromSponsor}
                            alignRight
                            skillsAmount={skills.length ? skills.length : 0}
                            clikedFrom="proof"
                        />
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};

export { ProofContent };
