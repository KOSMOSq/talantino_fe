import { useDispatch, useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { setMessage } from "../../../redux/reducers/appReducer";
import { getAuthThunk } from "../../../redux/reducers/authReducer";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const BalanceForm = () => {
    const token = useSelector(store => store.auth.token);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = async data => {
        try {
            await kudosAPI.addKudos(token, data.kudos);
            dispatch(
                setMessage(
                    `${data.kudos} kudos succesfully added to your account!`,
                    "success"
                )
            );
            dispatch(getAuthThunk());
        } catch (err) {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        } finally {
            reset();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Kudos"
                    {...register("kudos", {
                        required: {
                            value: true,
                            message: "This field is requeired!"
                        },
                        min: {
                            value: 1,
                            message:
                                "You cannot add 0 or less kudos to your balance!"
                        },
                        max: {
                            value: 1000,
                            message: "You are not a billionaire, calm down :)"
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "This field can contain only numbers!"
                        }
                    })}
                    error={Boolean(errors.kudos)}
                    helperText={errors.kudos ? errors.kudos.message : " "}
                />
                <Button type="submit">ADD KUDOS</Button>
            </form>
        </>
    );
};

export { BalanceForm };
