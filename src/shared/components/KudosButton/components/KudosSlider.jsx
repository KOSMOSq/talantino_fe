import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, IconButton, Slider } from "@mui/material";
import { useRef, useState } from "react";

const KudosSlider = ({
    kudosAmount,
    setKudosAmount,
    minValue,
    maxValue,
    step,
    handleKudos,
    skillsAmount,
    balance,
    marks
}) => {
    const [displayLabel, setDisplayLabel] = useState("auto");
    const timeout = useRef();
    const handleClickArrow = whatKind => {
        clearTimeout(timeout.current);

        if (whatKind === "forward" && kudosAmount + step <= balance) {
            setKudosAmount(prev => prev + step);
        } else if (
            whatKind === "back" &&
            kudosAmount - step >= skillsAmount &&
            kudosAmount - step !== 0
        ) {
            setKudosAmount(prev => prev - step);
        }

        setDisplayLabel("on");
        timeout.current = setTimeout(() => {
            setDisplayLabel("auto");
        }, 1000);
    };

    const handleChange = (e, value) => {
        setKudosAmount(value);
    };

    return (
        <>
            <Box
                width={"90%"}
                display="flex"
                flexDirection="column"
                alignItems="end"
            >
                <Slider
                    min={minValue}
                    max={maxValue}
                    step={step}
                    value={kudosAmount}
                    onChange={handleChange}
                    valueLabelDisplay={displayLabel}
                    marks={marks}
                />
            </Box>

            <Box width="100%" display="flex" justifyContent="space-between">
                <IconButton
                    onClick={() => handleClickArrow("back")}
                    disabled={kudosAmount === minValue}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Button
                    variant="contained"
                    onClick={handleKudos}
                    disabled={kudosAmount < skillsAmount || kudosAmount === 0}
                >
                    Send {kudosAmount} kudos
                </Button>
                <IconButton
                    onClick={() => handleClickArrow("forward")}
                    disabled={kudosAmount === maxValue}
                >
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
        </>
    );
};

export { KudosSlider };
