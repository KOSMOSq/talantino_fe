import { Button } from "@mui/material";
import { kudosAPI } from "../../../../api/kudosAPI";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../redux/reducers/appReducer";

const Balance = () => {
    const token = useSelector(store => store.auth.token);

    const dispatch = useDispatch();

    const addKudos = async () => {
        await kudosAPI.addKudos(token, 1);
        dispatch(setMessage("One kudo succesfully added to your account!", "success"));
    };

    return (
        <>
            <Button onClick={addKudos}>ADD 1 KUDOS</Button>
        </>
    );
};

export { Balance };