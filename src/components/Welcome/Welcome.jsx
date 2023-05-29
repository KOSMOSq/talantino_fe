import { Footer } from "../../shared/components/Footer/Footer";
import { MainGreeting } from "./components/MainGreeting/MainGreeting";
import { SponsorSection } from "./components/SponsorSection/SponsorSection";
import { TalentSection } from "./components/TalentSection/TalentSection";

const Welcome = () => {
    return (
        <>
            <MainGreeting />
            <SponsorSection />
            <TalentSection />
            <Footer />
        </>
    );
};

export { Welcome };
