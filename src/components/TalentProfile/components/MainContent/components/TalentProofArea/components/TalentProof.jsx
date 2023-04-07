import { Box, Chip, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

function TalentProof({
    date,
    title,
    description,
    status,
    id,
    talentId,
    onDelete,
}) {
    const authId = useSelector((store) => store.auth.id);
    const theme = createTheme({
        palette: {
            neutral: {
                main: "#64748B",
                contrastText: "#fff",
            },
        },
    });

    const timeUnits = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: (24 * 60 * 60 * 1000 * 365) / 12,
        week: (24 * 60 * 60 * 1000 * 30.4) / 4,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000,
    };
    const auto = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const getRelativeTime = (date1, date2 = new Date()) => {
        const result = date1 - date2;
        for (let item in timeUnits) {
            if (Math.abs(result) > timeUnits[item] || item === "second") {
                return auto.format(Math.round(result / timeUnits[item]), item);
            }
        }
    };

    const dateOBJ = new Date(date);
    const dateUTC = Date.UTC(
        dateOBJ.getFullYear(),
        dateOBJ.getMonth(),
        dateOBJ.getDate(),
        dateOBJ.getHours(),
        dateOBJ.getMinutes(),
        dateOBJ.getSeconds()
    );

    return (
        <>
            <Box
                sx={{
                    backgroundСolor: "#fff",
                    border: "1px solid #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {title}
                        <Typography sx={{ fontSize: "10px", color: "#888888" }}>
                            {getRelativeTime(dateUTC)}
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            {description}
                        </Typography>
                    </Typography>
                </Box>
                {+talentId === authId ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "start",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Chip
                                sx={{
                                    justifySelf: "right",
                                    fontSize: "16px",
                                }}
                                theme={theme}
                                color={
                                    status === "PUBLISHED"
                                        ? "success"
                                        : status === "DRAFT"
                                        ? "default"
                                        : "neutral"
                                }
                                label={status}
                            />
                            <EditIcon />
                            <IconButton onClick={() => onDelete(id)}>
                                <DeleteForeverIcon fontSize="medium" />
                            </IconButton>
                        </Box>
                    </Box>
                ) : (
                    ""
                )}
            </Box>
        </>
    );
}

export { TalentProof };
