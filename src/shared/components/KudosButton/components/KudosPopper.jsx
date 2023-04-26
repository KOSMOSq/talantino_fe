import { Box, Typography, Slider, Button } from "@mui/material";

const KudosPopper = ({ balance, kudosAmount, setKudosAmount, handleKudos }) => {
    const handleChange = (e, value) => {
        setKudosAmount(value);
    };

    return (
        <Box
            sx={{
                width: 350,
                border: 1,
                borderRadius: "10px",
                p: 2,
                bgcolor: "white",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
                Choose the number of kudos to send
            </Typography>
            <Box
                width={300}
                display="flex"
                flexDirection="column"
                alignItems="end"
            >
                <Slider
                    defaultValue={1}
                    min={1}
                    max={balance}
                    value={kudosAmount}
                    onChange={handleChange}
                    valueLabelDisplay={"on"}
                />
                {/* <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    {balance}
                </Typography> */}
            </Box>

            <Button variant="contained" onClick={handleKudos}>
                Send
            </Button>
        </Box>
    );
};

export default KudosPopper;
