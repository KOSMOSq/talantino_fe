import { createTheme } from "@mui/material/styles";

export const fontFamilyTheme = createTheme({
    typography: {
        allVariants: {
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500
        }
    },
    palette: {
        govno: {
            main: "#00FF00",
            dark: "#00FF11",
            contrastText: "#fff"
        }
    }
});
