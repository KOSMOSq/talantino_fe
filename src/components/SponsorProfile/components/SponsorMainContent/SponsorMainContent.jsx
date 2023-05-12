import { Navigate, Route, Routes } from "react-router-dom";
import { LinkTabs } from "../../../../shared/components/LinkTabs/LinkTabs";
import { KudosHistory } from "../KudosHistory/KudosHistory";
import { Box, Divider } from "@mui/material";
import { BalanceForm } from "../../../Forms/BalanceForm/BalanceForm";

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
                    <Divider />
                <Box sx={{ marginTop: "16px" }}>
                    <Routes>
                        <Route path="/" element={<BalanceForm />} />
                        <Route path="history" element={<KudosHistory />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export { SponsorMainContent };
