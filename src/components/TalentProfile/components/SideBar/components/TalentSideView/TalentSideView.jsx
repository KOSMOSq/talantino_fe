import { Chip, Typography } from "@mui/material";
import { ProofSkillsArea } from "../../../MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";
import { Links } from "../Links/Links";

const TalentSideView = ({ userInfo }) => {
    return (
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
                    ? `${userInfo.experience} year${
                          userInfo.experience > 1 ? "s" : ""
                      } experience`
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
                <ProofSkillsArea skills={userInfo.skills} forTalent />
            ) : null}
            <Links talentLinks={userInfo.links} />
        </>
    );
};

export { TalentSideView };
