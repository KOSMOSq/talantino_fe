import { Avatar, Box, Divider, Typography } from "@mui/material";

const KudosNotification = ({
    fromSponsor,
    sponsorAvatar,
    proofTitle,
    amount
}) => {
    return (
        <>
            <Box
                sx={{
                    ml: "12px",
                    mr: "4px",
                    mt: "6px",
                    width: "265px"
                }}
            >
                <Box display="Flex" gap={0.4}>
                    <Avatar src={sponsorAvatar}>{fromSponsor[0]}</Avatar>
                    <Box alignSelf="center">
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                overflow: "hidden",
                                width: "219px",
                                height: "18px"
                            }}
                            title={fromSponsor}
                        >
                            {fromSponsor}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            7 годін назат
                        </Typography>
                    </Box>
                </Box>
                <Typography sx={{ textAlign: "center", fontSize: "13px" }}>Has sent {amount} kudos on your proof:</Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        textAlign: "center",
                        mb: "4px"
                    }}
                    title={proofTitle}
                >
                    {proofTitle}
                </Typography>
                <Divider />
            </Box>
        </>
    );
};

export { KudosNotification };
