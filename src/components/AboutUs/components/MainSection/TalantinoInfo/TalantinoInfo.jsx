import { Box, Typography } from "@mui/material";
import { ReactComponent as TalantinoInfoSvg } from "../../../../../assets/img/TalantinoInfo.svg";

const TalantinoInfo = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={"340px"}
            p={0}
        >
            <Box
                width="920px"
                height="433px"
                top="310px"
                bgcolor="#E0F4FF"
                borderRadius="0px 60px 60px 0px"
            >
                <Typography mt={10} ml={18} fontSize={"1.875rem"} width="45rem">
                    Talantino is a Talent search website that was created and is
                    maintenanced by the ambitious team of students from various
                    universities and cities. We gather to bring to life an
                    awesome idea to allow, on the one hand, Talents to advertise
                    and prove their skills.
                </Typography>
            </Box>
            <TalantinoInfoSvg
                style={{ marginRight: "100px", paddingTop: "150px" }}
            />
        </Box>
    );
};

export { TalantinoInfo };
