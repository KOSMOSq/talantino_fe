import { Box, Chip, ThemeProvider, Tooltip, Typography } from "@mui/material";
import theme from "../../themes/skillsTheme";
import kudosIconActive from "../../../assets/icons/kudosIconActive.svg";
import kudosIconInactive from "../../../assets/icons/kudosIconInactive.svg";
import { useState, useRef, useLayoutEffect } from "react";
import { formatter } from "../../utils/numberFormatter";
import { useSelector } from "react-redux";

const SkillChip = ({
    icon,
    label,
    totalKudos,
    totalKudosFromSponsor,
    isKudosed,
    handleDelete,
    forTalent = false
}) => {
    const role = useSelector(store => store.auth.user.role);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Tooltip
                    title={`${
                        forTalent
                            ? ""
                            : role === "SPONSOR"
                            ? totalKudos +
                              ", " +
                              (totalKudosFromSponsor
                                  ? totalKudosFromSponsor
                                  : 0) +
                              " given by you"
                            : totalKudos
                    }`}
                    arrow
                    enterDelay={200}
                    enterNextDelay={100}
                    leaveDelay={100}
                >
                    <Chip
                        sx={{
                            cursor: role === "SPONSOR" && !forTalent ? "pointer" : "default",
                            filter: "none",
                            transition: "filter .3s",
                            ":hover": {
                                filter:
                                    role === "SPONSOR" && !forTalent
                                        ? "brightness(86%)"
                                        : "none"
                            }
                        }}
                        icon={
                            <img
                                src={icon}
                                width="18"
                                alt="skill"
                                style={{
                                    filter:
                                        theme.palette[label]?.contrastText !==
                                        "#000"
                                            ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)"
                                            : "invert(0%) sepia(0%) saturate(9%) hue-rotate(207deg) brightness(94%) contrast(105%)"
                                }}
                            />
                        }
                        label={
                            <Typography variant="span">
                                {label}
                                {forTalent ? null : (
                                    <Typography variant="span">
                                        {" • " + formatter.format(totalKudos)}
                                    </Typography>
                                )}
                            </Typography>
                        }
                        size="small"
                        color={theme.palette[label] ? label : "info"}
                    />
                </Tooltip>
            </ThemeProvider>
        </>
    );
};

export { SkillChip };
