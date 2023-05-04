import { Box, Container, LinearProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser } from "./components/DeleteUser/DeleteUser";
import { useNavigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { useEffect, useState } from "react";
import {
    changeProfileDataThunk,
    changeSponsorDataThunk,
    setIsDone
} from "../../redux/reducers/settingsReducer";
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { SettingsHeader } from "./components/SettingsHeader/SettingsHeader";
import { SocialLink } from "./components/SocialLinks/SocialLink";

const Settings = () => {
    const user = useSelector(store => store.auth.user);
    const id = useSelector(store => store.auth.user.id);
    const role = useSelector(store => store.auth.user.role);
    const isLoading = useSelector(store => store.settings.isLoading);
    const isDone = useSelector(store => store.settings.isDone);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [avatarSrc, setAvatarSrc] = useState();

    useEffect(() => {
        if (isDone) {
            role === "SPONSOR"
                ? navigate(`/sponsor/${id}`)
                : navigate(`/talent/${id}`);
            dispatch(setIsDone(false));
        }
    }, [isDone]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onChange",
        defaultValues:
            user.role === "SPONSOR"
                ? {
                      id: user.id,
                      name: user.name,
                      surname: user.surname,
                      avatar: user.avatar
                  }
                : {
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

    const handleFileChange = e => {
        if (e.target.files.length) {
            setAvatarSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onSubmit = data => {
        if (user.role === "TALENT") {
            dispatch(changeProfileDataThunk(data));
        } else if (user.role === "SPONSOR") {
            dispatch(changeSponsorDataThunk(data));
        }
    };

    return (
        <>
            {isLoading ? <LinearProgress /> : null}
            <Container sx={{ marginTop: 4, paddingBottom: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SettingsHeader />

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
                            {user.role === "TALENT" ? (
                                <>
                                    <TextField
                                        label="Location"
                                        sx={{ marginLeft: 2 }}
                                        {...register("location", {
                                            maxLength: {
                                                value: 100,
                                                message:
                                                    "Your location is too long"
                                            },
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Your location is too short"
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
                                                message:
                                                    "Your description is too long"
                                            },
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Your description is too short"
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
                                                required:
                                                    "Kind of talent is required",
                                                maxLength: {
                                                    value: 18,
                                                    message:
                                                        "Your talent is too BIG"
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Your talent is too short"
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z ]+$/,
                                                    message:
                                                        "Kind of talent can only contain letters"
                                                }
                                            })}
                                            error={Boolean(errors.kind)}
                                            helperText={
                                                errors.kind
                                                    ? errors.kind.message
                                                    : " "
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

                                    <Box
                                        display={"flex"}
                                        flexDirection={"row"}
                                        mt={2}
                                        gap={2}
                                    >
                                        {["zero", "one", "two", "three"].map(
                                            item => (
                                                <SocialLink
                                                    key={item}
                                                    register={register}
                                                    errors={errors}
                                                    num={item}
                                                />
                                            )
                                        )}
                                    </Box>
                                </>
                            ) : null}
                        </Box>

                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                        >
                            <ProfileAvatar
                                user={user}
                                avatarSrc={avatarSrc}
                                handleFileChange={handleFileChange}
                                register={register}
                            />

                            <DeleteUser />
                        </Box>
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default withAuthRedirect(Settings);
