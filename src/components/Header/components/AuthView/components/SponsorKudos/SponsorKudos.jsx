import { Box, Divider, Tooltip, Typography } from "@mui/material";
import { formatter } from "../../../../../../shared/utils/numberFormatter";
import kudosIconActive from "../../../../../../assets/icons/kudosIconActive.svg";

const SponsorKudos = ({balance}) => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ marginRight: "16px" }}
            >
                <Typography sx={{ color: "gray" }}>Balance</Typography>
                <Tooltip title={balance} enterDelay={400} enterNextDelay={400}>
                    <Typography
                        sx={{ fontWeight: "bold" }}
                        display="flex"
                        gap={0.5}
                    >
                        {formatter.format(balance)}
                        <img
                            src={kudosIconActive}
                            alt="kudos icon"
                            width="22"
                        />
                    </Typography>
                </Tooltip>
            </Box>
            <Divider orientation="vertical" flexItem />
        </>
    );
};

export default SponsorKudos;
