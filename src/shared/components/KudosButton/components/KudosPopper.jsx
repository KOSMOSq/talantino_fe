import {
    Box,
    Typography,
    Slider,
    Button,
    Fade,
    Paper,
    Popper
} from "@mui/material";
import { useMemo } from "react";

const KudosPopper = ({
    balance,
    kudosAmount,
    setKudosAmount,
    handleKudos,
    idPop,
    open,
    anchorEl
}) => {
    const handleChange = (e, value) => {
        setKudosAmount(value);
    };

    const marks = useMemo(() => {
        return [
            { value: 1, label: "1" },
            {
                value: Math.round(balance / 2) + (balance % 2 !== 0 ? 0 : 0.5),
                label: Math.round(balance / 2)
            },
            { value: balance, label: balance }
        ];
    }, [balance]);

    const marksForTwo = useMemo(() => {
        return [
            { value: 1, label: "1" },
            { value: 2, label: 2 }
        ];
    }, [balance]);

    const marksForOne = useMemo(() => {
        return [
            { value: 0, label: "0" },
            { value: 1, label: "1" }
        ];
    }, [balance]);

    return (
        <Popper
            id={idPop}
            open={open}
            anchorEl={anchorEl}
            placement="bottom"
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper
                        elevation={4}
                        sx={{
                            width: 350,

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
                                min={balance === 1 ? 0 : 1}
                                max={balance}
                                value={kudosAmount}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                marks={
                                    balance !== 2
                                        ? balance === 1
                                            ? marksForOne
                                            : marks
                                        : marksForTwo
                                }
                            />
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleKudos}
                            disabled={kudosAmount === 0}
                        >
                            Send {kudosAmount} kudos
                        </Button>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export { KudosPopper };
