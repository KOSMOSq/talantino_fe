import {
    Box,
    Button,
    FormHelperText,
    OutlinedInput,
    TextField
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SkillAutocomplete } from "../../../shared/components/SkillAutocomplete/SkillAutocomplete";
import { addTalentProofThunk } from "../../../redux/reducers/talentsProofsReducer";

const CreateProofForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        control
    } = useForm({
        mode: "all",
        defaultValues: {
            skills: []
        }
    });

    const dispatch = useDispatch();

    const onSubmit = (data, e) => {
        data.status = e.nativeEvent.submitter.value;
        dispatch(addTalentProofThunk(data));
        reset();
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
                        marginBottom: "20px"
                    }}
                    display="flex"
                    flexDirection="column"
                >
                    <OutlinedInput
                        sx={{
                            width: "100%",
                            height: "32px",
                            marginBottom: "10px",
                            fontWeight: "bold"
                        }}
                        placeholder="Title"
                        {...register("title", {
                            required: "Title should be at least 2 symbols long",
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
                    <TextField
                        sx={{
                            width: "100%",
                            height: "auto",
                            marginBottom: "10px"
                        }}
                        placeholder="Tell everyone about your proof"
                        minRows={2}
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
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <SkillAutocomplete onChange={onChange} />
                        )}
                    />
                    <Box display="flex" gap="10px">
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
                                errors.title?.message}
                        </FormHelperText>
                        <Box
                            sx={{ marginLeft: "auto" }}
                            display="flex"
                            gap="10px"
                        >
                            <Button
                                type="submit"
                                value="DRAFT"
                                title="Save as draft"
                                variant="outlined"
                                color="inherit"
                                disabled={!isValid}
                            >
                                Save
                            </Button>
                            <Button
                                type="submit"
                                value="PUBLISHED"
                                color="success"
                                variant="contained"
                                disabled={!isValid}
                            >
                                Publish
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </>
    );
};

export { CreateProofForm };
