import { Box, Typography } from "@mui/material";
import { FooterLinks } from "./FooterLinks/FooterLinks";

const Footer = () => {
    return (
        <Box
            bgcolor="#3FC2FF"
            pt="3rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            <Typography
                textAlign="center"
                color="white"
                fontSize="2.25rem"
                fontWeight="700"
            >
                Talantino
            </Typography>
            <FooterLinks />

            <Typography
                textAlign="center"
                color="white"
                fontSize="1rem"
                fontWeight="400"
                pb={1}
            >
                Copyright © Talantino 2023
            </Typography>
        </Box>
    );
};

export { Footer };
