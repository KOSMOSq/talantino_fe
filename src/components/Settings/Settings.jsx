import { Avatar, Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../api/authAPI";
import { talentsAPI } from "../../api/talentsAPI";
import { setTalentData } from "../../redux/reducers/authReducer";
import { DeleteTalent } from "../../components/TalentsPage/components/DeleteTalent/DeleteTalent"
import { useNavigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { useState } from "react";


const Settings = () => {
    const id = useSelector(store => store.auth.id)
    const name = useSelector(store => store.auth.name)
    const surname = useSelector(store => store.auth.surname)
    const email = useSelector(store => store.auth.email)
    const kind = useSelector(store => store.auth.kind)
    const description = useSelector(store => store.auth.description)
    const avatar = useSelector(store => store.auth.avatar)
    const experience = useSelector(store => store.auth.experience)
    const location = useSelector(store => store.auth.location)
    const links = useSelector(store => store.auth.links)
    const token = useSelector(store => store.auth.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [prPicture, setPrPicture] = useState();
    const handleChangeAvatar = (event) => {
        setPrPicture(event.target.value);
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            id: id,
            name: name,
            surname: surname,
            email: email,
            kind: kind,
            description: description,
            avatar: avatar,
            experience: experience,
            location: location,
            links: {
                zero: links[0],
                one: links[1],
                two: links[2],
                three: links[3],
            },
        }
    });

    const onSubmit = async (data) => {
        data.links = [data.links.zero, data.links.one, data.links.two, data.links.three];
        const response = await talentsAPI.changeData(id, token, data);
        const responseAuth = await authAPI.auth(token);
        dispatch(setTalentData(responseAuth));
        navigate(`/talent/${id}`);
    };

    return (
        <>
            <Container sx={{ marginTop: 4, paddingBottom: 5 }}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                        <Typography
                            sx={{ display: 'inline', fontSize: 24, fontWeight: "bold" }}
                            component="h6"
                            variant="h6">
                            Editing profile
                        </Typography>
                        <Button variant="outlined" type="submit" sx={{ fontSize: 16 }}>
                            Save changes
                        </Button>
                    </Box>
                    <Divider sx={{ marginTop: 2 }} />

                    <Box display={"flex"} justifyContent={"space-between"} mt={2}>

                        <Box width={{
                            lg: "55vw",
                            xl: "50vw"
                        }}>
                            <TextField label="Name" {...register("name", {
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
                                    message: "First name can only contain letters",
                                },
                            })}
                                error={Boolean(errors.name)}
                                helperText={
                                    errors.name
                                        ? errors.name.message
                                        : " "
                                }
                            />
                            <TextField label="Surname" sx={{ marginLeft: 2 }} {...register("surname", {
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
                                    message: "Last name can only contain letters",
                                },
                            })}
                                error={Boolean(errors.surname)}
                                helperText={
                                    errors.surname
                                        ? errors.surname.message
                                        : " "
                                }
                            />
                            <TextField label="Location" sx={{ marginLeft: 2 }} {...register("location", {
                                maxLength: {
                                    value: 100,
                                    message: "Your location is to long"
                                },
                                minLength: {
                                    value: 2,
                                    message: "Your location is to short"
                                },
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: "Location can only contain letters",
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
                                label="Description"
                                multiline
                                maxRows={7}
                                minRows={7}
                                sx={{ width: "91%", marginTop: 2 }}
                                {...register("description", {
                                    maxLength: {
                                        value: 3000,
                                        message: "Your description is to long"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Your description is to short"
                                    },
                                })}
                                error={Boolean(errors.description)}
                                helperText={
                                    errors.description
                                        ? errors.description.message
                                        : " "
                                }
                            />
                            <Box mt={2}>
                                <TextField label="Kind of talent" {...register("kind", {
                                    required: "Kind of talent is required",
                                    maxLength: {
                                        value: 18,
                                        message: "Your talent is to BIG"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Your talent is to short"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z ]+$/,
                                        message: "Kind of talent can only contain letters",
                                    },
                                })}
                                    error={Boolean(errors.kind)}
                                    helperText={
                                        errors.kind
                                            ? errors.kind.message
                                            : " "
                                    }
                                />
                                <TextField label="Experience" sx={{ marginLeft: 2 }} {...register("experience", {
                                    validate: value => (Number(value) <= 60 && Number(value) >= 0) || "You have too much experience XD",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Experience can only contain letters",
                                    },
                                })}
                                    error={Boolean(errors.experience)}
                                    helperText={
                                        errors.experience
                                            ? errors.experience.message
                                            : " "
                                    }
                                />
                            </Box>

                            <Box display={"flex"} flexDirection={"row"} mt={10}>
                                <TextField label="Social link" {...register("links.zero", {
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
                                <TextField label="Social link" sx={{ marginLeft: 2 }} {...register("links.one", {
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
                                <TextField label="Social link" sx={{ marginLeft: 2 }} {...register("links.two", {
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
                                <TextField label="Social link" sx={{ marginLeft: 2 }} {...register("links.three", {
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

                        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mr={2}>
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                <Avatar
                                    alt={name}
                                    src={prPicture || avatar || "error"}
                                    sx={{ width: 190, height: 190, marginBottom: 2, fontSize: "64px" }}
                                />

                                <TextField label="Avatar URL" {...register("avatar", {

                                })} onChange={handleChangeAvatar} />
                            </Box>
                            <Box display={"flex"} justifyContent={"center"} mb={1}>
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