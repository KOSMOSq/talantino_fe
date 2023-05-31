import { Box } from "@mui/material";

import { Footer } from "../../shared/components/Footer/Footer";
import { MainSection } from "./components/MainSection/MainSection";
import { TitleSection } from "./components/TitleSection/TitleSection";
import { TeamsSections } from "./components/TeamsSection/TeamsSection";

const AboutUs = () => {
    return (
        <>
            <Box mb={9}>
                <TitleSection />
                <MainSection />
                <TeamsSections title={"Backend team"} />
                <TeamsSections title={"Frontend team"} />
                <TeamsSections title={"QA team"} />
                <TeamsSections title={"Our mentor ❤"} />
            </Box>
            <Footer />
        </>
    );
};

export { AboutUs };
