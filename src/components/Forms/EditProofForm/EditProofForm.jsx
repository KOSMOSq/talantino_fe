import {
    Box,
    Button,
    FormHelperText,
    OutlinedInput,
    TextField,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import { theme } from "../../../shared/themes/neutralColorTheme";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editProofThunk } from "../../../redux/reducers/talentsProofsReducer";
import { useState } from "react";
import { getRelativeTime } from "../../../shared/functions/getRelativeTime";

const EditProofForm = ({
    id,
    title,
    description,
    status,
    setEditMode,
    date
}) => {
    const [alignment, setAlignment] = useState(status);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue
    } = useForm({
        mode: "all",
        defaultValues: {
            title: title,
            description: description,
            status: status
        }
    });

    const dispatch = useDispatch();

    const onSubmit = (data, e) => {
        dispatch(editProofThunk(id, data));
        setEditMode(false);
    };

    const handleChange = (e, newAlignment) => {
        if (newAlignment !== null) {
            setValue("status", newAlignment);
            setAlignment(newAlignment);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: "80%" }}>
                        {status === "DRAFT" ? (
                            <OutlinedInput
                                sx={{
                                    width: "100%",
                                    height: "32px",
                                    marginBottom: "10px",
                                    fontWeight: "bold"
                                }}
                                placeholder="Title"
                                {...register("title", {
                                    required:
                                        "Title should be at least 2 symbols long",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "Title should be at least 2 symbols long"
                                    },
                                    maxLength: {
                                        value: 40,
                                        message:
                                            "Title shouldn't be larger than 40 symbols"
                                    }
                                })}
                            />
                        ) : (
                            <>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, width: "100%" }}
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "10px",
                                        color: "#888888"
                                    }}
                                >
                                    {getRelativeTime(date)}
                                </Typography>
                            </>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "start",
                            height: "20px",
                            justifyContent: "right",
                            width: "30%"
                        }}
                    >
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            {status === "DRAFT" ? (
                                <ToggleButton
                                    value="DRAFT"
                                    sx={{ fontSize: "12px", padding: "5px" }}
                                >
                                    Draft
                                </ToggleButton>
                            ) : null}
                            <ToggleButton
                                value="PUBLISHED"
                                sx={{ fontSize: "12px", padding: "5px" }}
                            >
                                Published
                            </ToggleButton>
                            <ToggleButton
                                value="HIDDEN"
                                sx={{ fontSize: "12px", padding: "5px" }}
                            >
                                Hidden
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                {status === "DRAFT" ? (
                    <TextField
                        sx={{
                            width: "100%",
                            height: "auto",
                            marginBottom: "10px"
                        }}
                        placeholder="Tell everyone your proof"
                        minRows={1}
                        maxRows={10}
                        multiline
                        {...register("description", {
                            required: "Proof should be at least 2 symbols long",
                            minLength: {
                                value: 2,
                                message:
                                    "Proof should be at least 2 symbols long"
                            },
                            maxLength: {
                                value: 2000,
                                message:
                                    "Proof shouldn't be larger than 2000 symbols"
                            }
                        })}
                    />
                ) : (
                    <Typography
                        sx={{
                            fontSize: "16px",
                            overflowWrap: "break-word"
                        }}
                    >
                        {description}
                    </Typography>
                )}
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
                                    After changing Draft status it cannot be set
                                    again
                                </FormHelperText>
                            ))}
                    </FormHelperText>
                    <Box marginLeft="auto" display="flex" gap="10px">
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={() => setEditMode(prev => false)}
                        >
                            Cancel
                        </Button>
                        <ThemeProvider theme={theme}>
                            {alignment === "DRAFT" ? (
                                <Button
                                    type="submit"
                                    value="DRAFT"
                                    title="Save as draft"
                                    variant="contained"
                                    color="inherit"
                                    disabled={!isValid}
                                >
                                    Save
                                </Button>
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
            </form>
        </>
    );
};

export { EditProofForm };
