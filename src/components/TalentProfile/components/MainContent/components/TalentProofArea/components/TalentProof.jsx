import { Box, Chip, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getRelativeTime } from "../../../../../../../shared/functions/getRelativeTime";

function TalentProof({
    date,
    title,
    description,
    status,
    id,
    talentId,
    onDelete
}) {
    const authId = useSelector(store => store.auth.id);
    const theme = createTheme({
        palette: {
            neutral: {
                main: "#64748B",
                contrastText: "#fff"
            }
        }
    });

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
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box sx={{ width: "80%" }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, width: "100%" }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                sx={{ fontSize: "10px", color: "#888888" }}
                            >
                                {getRelativeTime(date)}
                            </Typography>
                        </Box>
                        {+talentId === authId ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "start",
                                    height: "20px",
                                    justifyContent: "right",
                                    width: "30%"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >
                                    <Chip
                                        sx={{
                                            justifySelf: "right",
                                            fontSize: "16px"
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
                                    {status === "DRAFT" ? (
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    ) : null}
                                    <IconButton onClick={() => onDelete(id)}>
                                        <DeleteForeverIcon fontSize="medium" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ) : (
                            ""
                        )}
                    </Box>
                    <Typography sx={{ fontSize: "16px" }}>
                        {description}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export { TalentProof };
