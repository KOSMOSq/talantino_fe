import { Box, Container, LinearProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
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
import { SkillAutocomplete } from "../../shared/components/SkillAutocomplete/SkillAutocomplete";
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { SettingsHeader } from "./components/SettingsHeader/SettingsHeader";
import { SocialLink } from "./components/SocialLinks/SocialLink";
import { CountryAutocomplete } from "./components/CountryAutocomplete/CountryAutocomplete";
import { setMessage } from "../../redux/reducers/appReducer";
import { settingsValidation } from "./settingsValidaton";

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
        formState: { errors },
        control,
        setValue
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
                      },
                      skills: user.skills.map(item => item.label)
                  }
    });

    const handleFileChange = e => {
        if (e.target.files.length) {
            if (e.target.files[0].size > 5 * 1024 * 1024) {
                dispatch(setMessage("Your file size should be less than 5MB", "error"));
                setValue("avatar", "samePhoto");
            } else {
                setAvatarSrc(URL.createObjectURL(e.target.files[0]));
            }
        }
    };

    const handleAvatarDelete = () => {
        setAvatarSrc("error");
        setValue("avatar", "DELETE");
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
                        <Box>
                            <Box display="flex" gap={2} flexWrap={"wrap"}>
                                <TextField
                                    label="Name"
                                    {...register("name", settingsValidation.name)}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name ? errors.name.message : " "
                                    }
                                />
                                <TextField
                                    label="Surname"
                                    {...register("surname", settingsValidation.surname)}
                                    error={Boolean(errors.surname)}
                                    helperText={
                                        errors.surname
                                            ? errors.surname.message
                                            : " "
                                    }
                                />
                                {user.role === "TALENT" ? (
                                    <Controller
                                        sx={{ width: 200 }}
                                        name="location"
                                        control={control}
                                        render={({
                                            field: { onChange, value }
                                        }) => (
                                            <CountryAutocomplete
                                                value={value}
                                                onChange={onChange}
                                                defaultLocation={user.location}
                                                error={errors.location}
                                            />
                                        )}
                                    />
                                ) : null}
                            </Box>
                            {user.role === "TALENT" ? (
                                <>
                                    <Box sx={{ maxWidth: 768 }}>
                                        <TextField
                                            label="Description  (Markdown is supported)"
                                            multiline
                                            maxRows={7}
                                            minRows={7}
                                            sx={{ width: "100%", marginTop: 2 }}
                                            {...register("description", settingsValidation.description)}
                                            error={Boolean(errors.description)}
                                            helperText={
                                                errors.description
                                                    ? errors.description.message
                                                    : " "
                                            }
                                        />
                                        <Controller
                                            name="skills"
                                            control={control}
                                            render={({
                                                field: { onChange, value }
                                            }) => (
                                                <SkillAutocomplete
                                                    value={value}
                                                    onChange={onChange}
                                                    defaultSkills={user.skills}
                                                    error={errors.skills}
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box
                                        mt={4}
                                        display="flex"
                                        gap={2}
                                        flexWrap="wrap"
                                    >
                                        <TextField
                                            label="Kind of talent"
                                            {...register("kind", settingsValidation.kind)}
                                            error={Boolean(errors.kind)}
                                            helperText={
                                                errors.kind
                                                    ? errors.kind.message
                                                    : " "
                                            }
                                        />
                                        <TextField
                                            label="Experience"
                                            {...register("experience", settingsValidation.experience)}
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
                                        flexWrap="wrap"
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
                                handleAvatarDelete={handleAvatarDelete}
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
