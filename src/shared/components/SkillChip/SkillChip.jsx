import { Chip, ThemeProvider } from "@mui/material";
import theme from "../../themes/skillsTheme";

const SkillChip = ({ icon, label, color, handleDelete }) => {

    return (
        <>
        <ThemeProvider theme={theme}>
            <Chip icon={icon} label={label} size="small" onDelete={handleDelete} color={color}/>
        </ThemeProvider>
        </>
    );
};

export { SkillChip };
