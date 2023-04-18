import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    LinearProgress,
    TextField,
    Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTalent } from "./components/DeleteTalent/DeleteTalent";
import { useNavigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { useEffect, useState } from "react";
import {
    changeProfileDataThunk,
    setIsDone
} from "../../redux/reducers/settingsReducer";

const Settings = () => {
    const user = useSelector(store => store.auth.user);
    const id = useSelector(store => store.auth.user.id);
    const isLoading = useSelector(store => store.settings.isLoading);
    const isDone = useSelector(store => store.settings.isDone);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [prPicture, setPrPicture] = useState();

    useEffect(() => {
        if (isDone) {
            navigate(`/talent/${id}`);
            dispatch(setIsDone(false));
        }
    }, [isDone]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
    } = useForm({
        mode: "onChange",
        defaultValues: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            kind: user.kind,
            description: user.description,
            avatar: user.avatar,
            experience: user.experience,
            location: user.location,
            links: {
                zero: user.links[0],
                one: user.links[1],
                two: user.links[2],
                three: user.links[3]
            }
        }
    });

    const handleChangeAvatar = event => {
        setPrPicture(event.target.value);
    };

    const onSubmit = data => {
        dispatch(changeProfileDataThunk(data));
    };

    return (
        <>
            {isLoading ? <LinearProgress /> : null}
            <Container sx={{ marginTop: 4, paddingBottom: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        display={"flex"}
                        width={"100%"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            sx={{
                                display: "inline",
                                fontSize: 24,
                                fontWeight: "bold"
                            }}
                            component="h6"
                            variant="h6"
                        >
                            Editing profile
                        </Typography>
                        <Button
                            variant="outlined"
                            type="submit"
                            sx={{ fontSize: 16 }}
                        >
                            Save changes
                        </Button>
                    </Box>
                    <Divider sx={{ marginTop: 2 }} />

                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        mt={2}
                    >
                        <Box
                            width={{
                                lg: "55vw",
                                xl: "50vw"
                            }}
                        >
                            <TextField
                                label="Name"
                                {...register("name", {
                                    required: "First name is required",
                                    maxLength: {
                                        value: 24,
                                        message: "Your name is too long"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Your name is too short"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message:
                                            "First name can only contain letters"
                                    }
                                })}
                                error={Boolean(errors.name)}
                                helperText={
                                    errors.name ? errors.name.message : " "
                                }
                            />
                            <TextField
                                label="Surname"
                                sx={{ marginLeft: 2 }}
                                {...register("surname", {
                                    required: "Last name is required",
                                    maxLength: {
                                        value: 24,
                                        message: "Your surname is too long"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Your surname is too short"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message:
                                            "Last name can only contain letters"
                                    }
                                })}
                                error={Boolean(errors.surname)}
                                helperText={
                                    errors.surname
                                        ? errors.surname.message
                                        : " "
                                }
                            />
                            <TextField
                                label="Location"
                                sx={{ marginLeft: 2 }}
                                {...register("location", {
                                    maxLength: {
                                        value: 100,
                                        message: "Your location is too long"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Your location is too short"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z ,]+$/,
                                        message:
                                            "Location can only contain letters"
                                    }
                                })}
                                error={Boolean(errors.location)}
                                helperText={
                                    errors.location
                                        ? errors.location.message
                                        : " "
                                }
                            />
                            <TextField
                                label="Description  (Markdown is supported)"
                                multiline
                                maxRows={7}
                                minRows={7}
                                sx={{ width: "91%", marginTop: 2 }}
                                {...register("description", {
                                    maxLength: {
                                        value: 3000,
                                        message: "Your description is too long"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Your description is too short"
                                    }
                                })}
                                error={Boolean(errors.description)}
                                helperText={
                                    errors.description
                                        ? errors.description.message
                                        : " "
                                }
                            />
                            <Box mt={2}>
                                <TextField
                                    label="Kind of talent"
                                    {...register("kind", {
                                        required: "Kind of talent is required",
                                        maxLength: {
                                            value: 18,
                                            message: "Your talent is too BIG"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Your talent is too short"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z ]+$/,
                                            message:
                                                "Kind of talent can only contain letters"
                                        }
                                    })}
                                    error={Boolean(errors.kind)}
                                    helperText={
                                        errors.kind ? errors.kind.message : " "
                                    }
                                />
                                <TextField
                                    label="Experience"
                                    sx={{ marginLeft: 2 }}
                                    {...register("experience", {
                                        validate: value =>
                                            (Number(value) <= 60 &&
                                                Number(value) >= 0) ||
                                            "You have too much experience XD",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message:
                                                "Experience can only contain numbers"
                                        }
                                    })}
                                    error={Boolean(errors.experience)}
                                    helperText={
                                        errors.experience
                                            ? errors.experience.message
                                            : " "
                                    }
                                />
                            </Box>

                            <Box display={"flex"} flexDirection={"row"} mt={2}>
                                <TextField
                                    label="Social link"
                                    {...register("links.zero", {
                                        maxLength: {
                                            value: 100,
                                            message: "Too long link"
                                        }
                                    })}
                                    error={Boolean(errors.links?.zero)}
                                    helperText={
                                        errors.links?.zero
                                            ? errors.links?.zero.message
                                            : " "
                                    }
                                />
                                <TextField
                                    label="Social link"
                                    sx={{ marginLeft: 2 }}
                                    {...register("links.one", {
                                        maxLength: {
                                            value: 100,
                                            message: "Too long link"
                                        }
                                    })}
                                    error={Boolean(errors.links?.one)}
                                    helperText={
                                        errors.links?.one
                                            ? errors.links?.one.message
                                            : " "
                                    }
                                />
                                <TextField
                                    label="Social link"
                                    sx={{ marginLeft: 2 }}
                                    {...register("links.two", {
                                        maxLength: {
                                            value: 100,
                                            message: "Too long link"
                                        }
                                    })}
                                    error={Boolean(errors.links?.two)}
                                    helperText={
                                        errors.links?.two
                                            ? errors.links?.two.message
                                            : " "
                                    }
                                />
                                <TextField
                                    label="Social link"
                                    sx={{ marginLeft: 2 }}
                                    {...register("links.three", {
                                        maxLength: {
                                            value: 100,
                                            message: "Too long link"
                                        }
                                    })}
                                    error={Boolean(errors.links?.three)}
                                    helperText={
                                        errors.links?.three
                                            ? errors.links?.three.message
                                            : " "
                                    }
                                />
                            </Box>
                        </Box>

                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                            >
                                <Avatar
                                    alt={user.name}
                                    src={prPicture || user.avatar || "error"}
                                    sx={{
                                        width: 190,
                                        height: 190,
                                        marginBottom: 2,
                                        fontSize: "64px"
                                    }}
                                />

                                <TextField
                                    label="Avatar URL"
                                    {...register("avatar", {
                                        maxLength: {
                                            value: 1000,
                                            message: "Your link is too long!"
                                        },
                                        onChange: handleChangeAvatar
                                    })}
                                    error={Boolean(errors.avatar)}
                                    helperText={
                                        errors.avatar
                                            ? errors.avatar.message
                                            : " "
                                    }
                                />
                            </Box>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                mb={4}
                            >
                                <DeleteTalent />
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default withAuthRedirect(Settings);
