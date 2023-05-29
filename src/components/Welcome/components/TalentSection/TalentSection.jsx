import { Box, Typography } from "@mui/material";
import { ReactComponent as TalentSectionImg } from "../../../../assets/img/TalentSection.svg";

const TalentSection = () => {
    return (
        <Box
            bgcolor="#F4FBFF"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={30}
            p={"5.625rem"}
        >
            <TalentSectionImg />
            <Typography fontSize={"1.875rem"} width="45rem">
                As a Talent, you have a wonderful opportunity to share your
                knowledge and to become a member of the promising, up-and-coming
                team.
            </Typography>
        </Box>
    );
};

export { TalentSection };
