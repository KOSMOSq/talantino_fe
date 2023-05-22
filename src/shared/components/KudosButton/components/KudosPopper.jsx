import {
    Box,
    Typography,
    Slider,
    Button,
    Fade,
    Paper,
    Popper,
    IconButton
} from "@mui/material";
import { useMemo, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const KudosPopper = ({
    balance,
    kudosAmount,
    setKudosAmount,
    handleKudos,
    idPop,
    open,
    anchorEl,
    skillsAmount
}) => {
    const [displayLabel, setDisplayLabel] = useState("auto");
    const timeout = useRef();

    const step = skillsAmount ? skillsAmount : 1;

    const maxValue = skillsAmount
        ? skillsAmount + step > balance
            ? skillsAmount
            : Math.floor(balance / skillsAmount) * skillsAmount
        : balance;

    const minValue = skillsAmount
        ? skillsAmount === balance
            ? 0
            : skillsAmount + step > balance
            ? 0
            : skillsAmount
        : balance === 1
        ? 0
        : 1;
    const handleChange = (e, value) => {
        setKudosAmount(value);
    };

    const marksWithoutSkills = useMemo(() => {
        return [
            { value: 1, label: 1 },
            { value: balance, label: balance }
        ];
    }, [balance]);

    if (balance === 1) {
        marksWithoutSkills[0] = { value: 0, label: 0 };
    }

    const marksWithSkillsValue =
        skillsAmount === balance
            ? 0
            : skillsAmount + step > balance
            ? 0
            : skillsAmount;

    const marksWithSkills = useMemo(() => {
        return [
            {
                value: marksWithSkillsValue,
                label: marksWithSkillsValue
            },
            { value: maxValue, label: maxValue }
        ];
    }, [marksWithSkillsValue, maxValue]);

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
                            width={"90%"}
                            display="flex"
                            flexDirection="column"
                            alignItems="end"
                        >
                            <Slider
                                min={minValue}
                                max={maxValue}
                                value={kudosAmount}
                                step={step}
                                onChange={handleChange}
                                valueLabelDisplay={displayLabel}
                                marks={
                                    skillsAmount
                                        ? marksWithSkills
                                        : marksWithoutSkills
                                }
                            />
                        </Box>

                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <IconButton
                                onClick={() => handleClickArrow("back")}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Button
                                variant="contained"
                                onClick={handleKudos}
                                disabled={
                                    kudosAmount < skillsAmount ||
                                    kudosAmount === 0
                                }
                            >
                                Send {kudosAmount} kudos
                            </Button>
                            <IconButton
                                onClick={() => handleClickArrow("forward")}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export { KudosPopper };
