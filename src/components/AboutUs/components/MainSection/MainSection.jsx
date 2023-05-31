import { Box } from "@mui/material";
import { TalantinoInfo } from "./TalantinoInfo/TalantinoInfo";
import { AdditionalInfo } from "./AdditionalInfo/AdditionalInfo";

const MainSection = () => {
    return (
        <Box>
            <TalantinoInfo />
            <AdditionalInfo />
        </Box>
    );
};

export { MainSection };
