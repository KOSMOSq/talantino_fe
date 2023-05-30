import { Box } from "@mui/material";
import { ReactComponent as MainGreetingImg } from "../../../../assets/img/mainGreeting.svg";
import { TextSection } from "./TextSection/TextSection";

const MainGreeting = () => {
    return (
        <Box
            pl={10}
            pr={10}
            height={window.innerHeight - window.innerHeight * 0.1}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            bgcolor="#F4FBFF"
            mt={1}
        >
            <TextSection />
            <MainGreetingImg />
        </Box>
    );
};

export { MainGreeting };
