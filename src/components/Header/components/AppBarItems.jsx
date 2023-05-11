import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/talantinoLogo.svg";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../redux/reducers/skillsReducer";

function AppBarItems() {
    const pages = ["Talents", "Proofs"];
    const dispatch = useDispatch();
    const handleCLick = () => {
        dispatch(setQuery(""));
    };
    return (
        <>
            <Link to="/talents" onClick={handleCLick}>
                <img src={logo} alt="logo" width={160} />
            </Link>
            {pages.map(page => (
                <Button
                    onClick={handleCLick}
                    key={page}
                    component={NavLink}
                    to={`${page.toLowerCase()}`}
                    sx={{ padding: 2, fontSize: 20 }}
                >
                    {page}
                </Button>
            ))}
        </>
    );
}

export { AppBarItems };
