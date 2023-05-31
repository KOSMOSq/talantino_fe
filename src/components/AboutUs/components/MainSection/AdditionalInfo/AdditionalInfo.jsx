import { Box, Typography } from "@mui/material";
import { ReactComponent as AdditionalInfoSvg } from "../../../../../assets/img/AdditionalInfo.svg";

const AdditionalInfo = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={"340px"}
            p={0}
            mt={"100px"}
        >
            <AdditionalInfoSvg
                style={{ marginLeft: "150px", paddingTop: "100px" }}
            />
            <Box
                width="920px"
                height="400px"
                top="883px"
                left="1026px"
                bgcolor="#E0F4FF"
                borderRadius="60px 0px 0px 60px"
            >
                <Typography mt={10} ml={10} fontSize={"1.875rem"} width="45rem">
                    And, on the other hand, Sponsors are able to set up the
                    company of your dreams and find talented professionals who
                    will help your company thrive. Join the Talantino website
                    and create a strong team for your growth and success.
                </Typography>
            </Box>
        </Box>
    );
};

export { AdditionalInfo };
