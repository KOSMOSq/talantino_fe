import { Box, Typography } from "@mui/material";
import { ReactComponent as SponsorSectionImg } from "../../../../assets/img/SponsorSection.svg";

const SponsorSection = () => {
    return (
        <Box
            bgcolor="#E0F6FF"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={10}
            p={"5.625rem"}
        >
            <Typography fontSize={"1.875rem"} width="45rem">
                Talantino is a great platform that will help you, as a Sponsor,
                to find and attract exceptional professionals for your business.
            </Typography>
            <SponsorSectionImg />
        </Box>
    );
};

export { SponsorSection };
