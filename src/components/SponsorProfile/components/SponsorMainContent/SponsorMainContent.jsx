import { Navigate, Route, Routes } from "react-router-dom";
import { LinkTabs } from "../../../../shared/components/LinkTabs/LinkTabs";
import { Balance } from "../Balance/Balance";
import { KudosHistory } from "../KudosHistory/KudosHistory";
import { AppBar, Box } from "@mui/material";

const SponsorMainContent = () => {
    return (
        <>
            <Box sx={{ width: "70%" }}>
                    <LinkTabs
                        tabs={[
                            { lable: "Balance", href: "" },
                            { lable: "History", href: "history" }
                        ]}
                    />
                <Box sx={{ marginTop: "16px" }}>
                    <Routes>
                        <Route path="/" element={<Balance />} />
                        <Route path="history" element={<KudosHistory />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export { SponsorMainContent };
