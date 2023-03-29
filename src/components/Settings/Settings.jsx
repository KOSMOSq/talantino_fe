import { Avatar, Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../api/authAPI";
import { talentsAPI } from "../../api/talentsAPI";
import { setTalentData } from "../../redux/reducers/authReducer";
import { DeleteTalent } from "../../components/TalentsPage/components/DeleteTalent/DeleteTalent"
import { useNavigate } from "react-router-dom";
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
        reset,
        errors
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
            links: links,
        }
    });

    const onSubmit = async (data) => {
        const response = await talentsAPI.changeData(id, token, data);
        const responseAuth = await authAPI.auth(token);
        dispatch(setTalentData(responseAuth));
        navigate(`/talent/${id}`);
    };

    return (
        <>
            <Container sx={{marginTop: 4, paddingBottom: 5}}>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                        <Typography 
                            sx={{ display: 'inline', fontSize: 24, fontWeight: "bold" }}
                            component="h6"
                            variant="h6"> 
                            Editing profile 
                        </Typography>
                        <Button variant="outlined" type="submit" sx={{fontSize: 16}}>
                            Save changes
                        </Button>
                    </Box>
                    <Divider sx={{marginTop:2}}/>
                    
                    <Box display={"flex"} justifyContent={"space-between"} mt={2}> 
                        
                        <Box width={{
                            lg: "55vw",
                            xl: "50vw"
                            }}>
                            <TextField label="Name" {...register("name", {
                                required: "This field is required",
                                
                            })} />
                            <TextField label="Surname" sx={{marginLeft: 2}} {...register("surname", {
                                required: "This field is required",
                            })} />
                            <TextField label="Location" sx={{marginLeft: 2}} {...register("location", {

                            })} />
                            
                            <TextField 
                                label="Description" 
                                multiline 
                                maxRows ={7} 
                                minRows = {7}
                                sx={{width: "91%", marginTop: 2}}
                                {...register("description", {

                            })} />
                            <Box mt={2}>
                                <TextField label="Kind of talent" {...register("kind", {
                                    required: "This field is required",
                                })} />
                                <TextField label="Experience" sx={{marginLeft: 2}} {...register("experience", {

                                })} />
                            </Box>

                            <Box display={"flex"} flexDirection={"row"} mt={10}>
                                <TextField label="Social link" {...register("links", {

                                })} />
                                <TextField label="Social link" sx={{marginLeft: 2}} {...register("links", {

                                })} />
                                <TextField label="Social link" sx={{marginLeft: 2}} {...register("links", {

                                })} />
                                <TextField label="Social link" sx={{marginLeft: 2}} {...register("links", {

                                })} />
                            </Box>    
                            
                        </Box>

                        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mr={2}>
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                <Avatar
                                alt={name}
                                src={prPicture || avatar || "error"}
                                sx={{ width: 190, height: 190, marginBottom: 2, fontSize: "64px" }}
                                />

                                <TextField  label="Avatar URL" {...register("avatar", {
            
                                })} onChange={handleChangeAvatar}/> 
                            </Box>   
                            <Box display={"flex"} justifyContent={"center"} mb={1}>
                                <DeleteTalent/>  
                            </Box>    
                        </Box>
                        
                    </Box>
                </form>
            </Container>
        </>
    );
};

export { Settings };