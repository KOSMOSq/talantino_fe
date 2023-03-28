import { Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../api/authAPI";
import { talentsAPI } from "../../api/talentsAPI";
import { setTalentData } from "../../redux/reducers/authReducer";
import { DeleteTalent } from "../../components/TalentsPage/components/DeleteTalent/DeleteTalent"
import { useNavigate } from "react-router-dom";


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
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="name" {...register("name", {
                        required: "This field is required",
                    })} />
                    <TextField label="surname" {...register("surname", {
                        required: "This field is required",
                    })} />
                    <TextField label="kind" {...register("kind", {
                        required: "This field is required",
                    })} />
                    <TextField label="avatar" {...register("avatar", {

                    })} />
                    <TextField label="description" {...register("description", {

                    })} />
                    <TextField label="experience" {...register("experience", {

                    })} />
                    <TextField label="location" {...register("location", {

                    })} />
                    <TextField label="links" {...register("links", {

                    })} />
                    <Button type="submit">
                        SAVE
                    </Button>
                    <DeleteTalent />
                </form>
            </Container>
        </>
    );
};

export { Settings };