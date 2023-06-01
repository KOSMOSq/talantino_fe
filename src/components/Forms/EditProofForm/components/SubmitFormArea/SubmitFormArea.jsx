import {
    Box,
    Button,
    FormHelperText,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import { theme } from "../../../../../shared/themes/neutralColorTheme";

const SubmitFormArea = ({
    errors,
    status,
    isValid,
    alignment,
    setEditMode
}) => {
    return (
        <Box display="flex">
            <FormHelperText
                error
                component="span"
                sx={{
                    marginLeft: "10px",
                    marginTop: "auto",
                    marginBottom: "auto"
                }}
            >
                {errors.description?.message ||
                    errors.title?.message ||
                    (status === "DRAFT" && status !== alignment && (
                        <FormHelperText error>
                            After changing Draft status it cannot be set again
                        </FormHelperText>
                    ))}
            </FormHelperText>
            <Box marginLeft="auto" display="flex" gap="10px" marginTop="8px">
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => setEditMode(prev => false)}
                >
                    Cancel
                </Button>
                <ThemeProvider theme={theme}>
                    {alignment === "DRAFT" ? (
                        <Tooltip
                            title="Save as draft"
                            enterDelay={500}
                            enterNextDelay={500}
                        >
                            <Box>
                                <Button
                                    type="submit"
                                    value="DRAFT"
                                    variant="contained"
                                    color="inherit"
                                    disabled={!isValid}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Tooltip>
                    ) : alignment === "PUBLISHED" ? (
                        <Button
                            type="submit"
                            value="PUBLISHED"
                            color="success"
                            variant="contained"
                            disabled={!isValid}
                        >
                            Publish
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            value="HIDDEN"
                            color="neutral"
                            variant="contained"
                            disabled={!isValid}
                        >
                            Hide
                        </Button>
                    )}
                </ThemeProvider>
            </Box>
        </Box>
    );
};

export { SubmitFormArea };
