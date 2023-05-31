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
                <TeamsSections title={"Frontend team"} />
                <TeamsSections title={"Backend team"} />
                <TeamsSections title={"QA team"} />
                <TeamsSections title={"Team manager ❤"} />
            </Box>
            <Footer />
        </>
    );
};

export { AboutUs };
