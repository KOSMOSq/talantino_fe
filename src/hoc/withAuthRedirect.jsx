import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { setClikedId } from "../redux/reducers/talentsReducer";
import { useEffect } from "react";

const withAuthRedirect = Component => props => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const { talentId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (talentId) {
            dispatch(setClikedId(talentId));
        }
    }, []);

    if (isAuth) {
        return <Component {...props} />
    } else {
        return <Navigate to="/login" />
    }
};

export { withAuthRedirect };