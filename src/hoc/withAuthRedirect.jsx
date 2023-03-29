import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const withAuthRedirect = Component => props => {
    const isAuth = useSelector(store => store.auth.isAuth);

    if (isAuth) {
        return <Component {...props} />
    } else {
        return <Navigate to="/login" />
    }
};

export { withAuthRedirect };