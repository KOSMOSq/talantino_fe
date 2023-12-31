import { Box } from "@mui/material";
import { ProfileStickyHeader } from "./components/ProfileStickyHeader/ProfileStickyHeader";
import { Routes, Route, Navigate } from "react-router-dom";
import { Overview } from "./components/Overview/Overview";
import { TalentProofArea } from "./components/TalentProofArea/TalentProofArea";
import { TalentStats } from "./components/TalentStats/TalentStats";

function MainContent({ talentDescription, talentId, prevId, nextId }) {
    return (
        <Box
            width={"70%"}
            ml={2}
            sx={{ display: "flex", flexDirection: "column" }}
        >
            <ProfileStickyHeader
                talentId={talentId}
                nextId={nextId}
                prevId={prevId}
            />
            <Routes>
                <Route path="proofs" element={<TalentProofArea />} />
                <Route
                    path="statistics"
                    element={<TalentStats talentId={talentId} />}
                />
                <Route
                    path="/"
                    element={<Overview talentDescription={talentDescription} />}
                />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    );
}

export { MainContent };
