import { LinearProgress } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authAPI } from "../../api/authAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAuthThunk,
    setTalentData,
    setToken
} from "../../redux/reducers/authReducer";

const EmailConfirm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const isAuth = useSelector(store => store.auth.isAuth);
    useEffect(() => {
        const getConfired = async () => {
            const response = await authAPI.emailConfirm(
                searchParams.get("token")
            );
            localStorage.setItem("token", response);
            dispatch(setToken(response));
            dispatch(getAuthThunk());
            //navigate("/settings");
        };
        getConfired();
    }, []);
    useEffect(() => {
        navigate("/settings");
    }, [isAuth]);

    return <LinearProgress />;
};

export { EmailConfirm };
