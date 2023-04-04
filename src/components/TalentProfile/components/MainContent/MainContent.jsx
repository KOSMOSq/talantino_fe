import { Box } from "@mui/material";
import { ProfileStickyHeader } from "./components/ProfileStickyHeader/ProfileStickyHeader";
import { Routes, Route, Navigate } from "react-router-dom";
import { Overview } from "./components/Overview/Overview";

function MainContent({ talentDescription, talentId, id, prevId, nextId }) {
    return (
        <Box width={"70%"} sx={{ display: "flex", flexDirection: "column" }}>
            <ProfileStickyHeader talentId={talentId} id={id} nextId={nextId} prevId={prevId} />
            <Routes>
                <Route path="proofs" element={<h1>proofs</h1>} />
                <Route path="/" element={<Overview talentDescription={talentDescription} />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    )
}

export { MainContent }