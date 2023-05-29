import { Chip, Typography } from "@mui/material";
import { ProofSkillsArea } from "../../../MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";
import { Links } from "../Links/Links";
import { useState } from "react";
import { ModalConfirmation } from "../../../../../ModalConfirmation/ModalConfirmation";
import { useSelector } from "react-redux";

const TalentSideView = ({ userInfo, handleReport }) => {
    const [open, setOpen] = useState(false);

    const id = useSelector(store => store.auth.user.id);

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
            {userInfo.id !== id ? (
                <>
                    <Typography
                        onClick={() => setOpen(prev => !prev)}
                        sx={{
                            fontSize: "14px",
                            color: "#888888",
                            ":hover": {
                                color: "#1051e8",
                                textDecoration: "underline"
                            },
                            cursor: "pointer",
                            width: "max-content"
                        }}
                    >
                        Report
                    </Typography>
                    <ModalConfirmation
                        open={open}
                        handleArgee={() => {
                            handleReport();
                            setOpen(prev => !prev);
                        }}
                        handleClose={() => setOpen(prev => !prev)}
                        title={`Are you sure you want to report ${userInfo.name} ${userInfo.surname}?`}
                        description="This talent will be sent for verification by the site moderator."
                        error
                        agreeButtonText="Report"
                    />{" "}
                </>
            ) : null}
        </>
    );
};

export { TalentSideView };
