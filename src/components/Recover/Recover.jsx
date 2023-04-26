import { Box, Button, Typography } from "@mui/material";
import { sponsorAPI } from "../../api/sponsorAPI";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/reducers/appReducer";

const Recover = () => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    if (isAuth) {
        return <Navigate to="/talents" />;
    }

    const handleClick = async () => {
        try {
            await sponsorAPI.recoverAccount(searchParams.get("token"));
            dispatch(
                setMessage("Account has been successfully recovered", "success")
            );
            navigate("/login");
        } catch (error) {
            dispatch(
                setMessage(
                    error.response?.data.message
                        ? error.response.data.message
                        : "Network error",
                    "error"
                )
            );
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            height={500}
            alignItems="center"
            flexDirection="column"
        >
            <Typography variant="h6" mb={2}>
                Click to recover your account
            </Typography>
            <Button onClick={handleClick} variant="contained">
                Recover account
            </Button>
        </Box>
    );
};

export { Recover };
