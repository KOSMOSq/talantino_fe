import { createTheme } from "@mui/material/styles";

export const fontFamilyTheme = createTheme({
    typography: {
        allVariants: {
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500
        }
    }
});
