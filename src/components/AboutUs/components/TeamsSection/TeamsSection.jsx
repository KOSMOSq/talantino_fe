import { TitleTeam } from "./TitleTeam/TitleTeam";
import { CardsArea } from "./CardsArea/CardsArea";

const TeamsSections = ({ title }) => {
    return (
        <>
            <TitleTeam title={title} />
            <CardsArea title={title} />
        </>
    );
};

export { TeamsSections };
