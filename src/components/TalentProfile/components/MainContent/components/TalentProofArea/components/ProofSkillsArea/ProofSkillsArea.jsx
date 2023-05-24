import { KudosButton } from "../../../../../../../../shared/components/KudosButton/KudosButton";
import { SkillChip } from "../../../../../../../../shared/components/SkillChip/SkillChip";
import { Box } from "@mui/material";

const ProofSkillsArea = ({ skills = [], forTalent = false, proofId }) => {
    return (
        <>
            <Box
                display="flex"
                flexWrap="wrap"
                sx={{ width: "100%", marginTop: "8px" }}
                gap={0.8}
            >
                {skills.map((skill, index) => (
                    <SkillChip key={index} {...skill} forTalent={forTalent} proofId={proofId}/>
                ))}
            </Box>
        </>
    );
};

export { ProofSkillsArea };
