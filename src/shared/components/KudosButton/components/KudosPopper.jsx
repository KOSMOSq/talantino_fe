import { Typography, Fade, Paper, Popper } from "@mui/material";
import { KudosSlider } from "./KudosSlider";
import { configsForSlider } from "../configsForSlider/configsForSlider";

const KudosPopper = ({
    balance,
    idPop,
    open,
    anchorEl,
    skillsAmount,
    clikedFrom,
    kudosAmount,
    setKudosAmount,
    handleKudos
}) => {
    const configForSlider = configsForSlider(clikedFrom, skillsAmount, balance);

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

                        <KudosSlider
                            {...configForSlider}
                            kudosAmount={kudosAmount}
                            setKudosAmount={setKudosAmount}
                            handleKudos={handleKudos}
                            balance={balance}
                            skillsAmount={skillsAmount}
                        />
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export { KudosPopper };
