import { Chip, ThemeProvider } from "@mui/material";
import theme from "../../themes/skillsTheme";

const SkillChip = ({ icon, label, handleDelete }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Chip
                    icon={
                        <img
                            src={icon}
                            width="18"
                            alt="skill"
                            style={{
                                filter:
                                    theme.palette[label]?.contrastText !== "#000"
                                        ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)"
                                        : "invert(0%) sepia(0%) saturate(9%) hue-rotate(207deg) brightness(94%) contrast(105%)"
                            }}
                        />
                    }
                    label={label}
                    size="small"
                    onDelete={handleDelete}
                    color={theme.palette[label] ? label: "info"}
                />
            </ThemeProvider>
        </>
    );
};

export { SkillChip };
