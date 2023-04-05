import { Box, Button, FormControl, FormHelperText, OutlinedInput, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const CreateProofForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data, e) => {
        console.log(data, e.nativeEvent.submitter.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        backgroundСolor: "#fff",
                        border: "1px solid #888888",
                        borderRadius: "5px",
                        padding: "15px",
                        marginBottom: "20px",
                    }}
                    display="flex"
                    flexDirection="column"
                >
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", marginLeft: "auto", marginRight: "auto", marginBottom: "14px" }}>
                        Create proof
                    </Typography>
                    <OutlinedInput
                        sx={{ width: "100%", height: "32px", marginBottom: "10px", fontWeight: "bold" }}
                        placeholder="Title"
                        {...register("title", {
                            required: "Title should be at least 2 symbols long",
                            minLength: {
                                value: 2,
                                message: "Title should be at least 2 symbols long"
                            },
                            maxLength: {
                                value: 80,
                                message: "Title should'nt be larger than 80 symbols"
                            }
                        })}
                        error={Boolean(errors.title)}
                    />
                    <TextField
                        sx={{ width: "100%", height: "100px", marginBottom: "10px" }}
                        placeholder="Tell everyone your proof"
                        rows={3}
                        multiline
                        {...register("proofText", {
                            required: "Proof should be at least 2 symbols long",
                            minLength: {
                                value: 2,
                                message: "Proof should be at least 2 symbols long"
                            },
                            maxLength: {
                                value: 2000,
                                message: "Proof should'nt be larger than 2000 symbols"
                            }
                        })}
                        error={Boolean(errors.proofText)}
                    />
                    <Box display="flex" gap="10px">
                        <FormHelperText component="span" error sx={{ marginLeft: "10px", marginTop: "auto", marginBottom: "auto" }}>
                            {errors.proofText?.message || errors.title?.message}
                        </FormHelperText>
                        <Box sx={{ marginLeft: "auto" }} display="flex" gap="10px">
                            <Button type="submit" value="save" variant="outlined" color="inherit" disabled={!isValid}>Save</Button>
                            <Button type="submit" value="publish" variant="contained" disabled={!isValid}>Publish</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </>
    );
};

export { CreateProofForm };