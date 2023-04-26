import { Box, Typography, Slider, Button } from "@mui/material";
import { useMemo } from "react";

const KudosPopper = ({ balance, kudosAmount, setKudosAmount, handleKudos }) => {
    const handleChange = (e, value) => {
        setKudosAmount(value);
    };
    const marks = useMemo(() => {
        return [
            { value: 1, label: "1" },
            {
                value: Math.ceil(balance / 2),
                label: Math.ceil(balance / 2)
            },
            { value: balance, label: balance }
        ];
    }, [balance]);

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
                    marks={marks}
                />
            </Box>

            <Button variant="contained" onClick={handleKudos}>
                Send
            </Button>
        </Box>
    );
};

export { KudosPopper };
