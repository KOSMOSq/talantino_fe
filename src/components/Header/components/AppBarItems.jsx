import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/talantinoLogo.svg";

function AppBarItems() {
    const pages = ["Talents", "Proofs"];

    return (
        <>
            <Link to="/talents">
                <img src={logo} alt="logo" width={160} />
            </Link>
            {pages.map(page => (
                <Button
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
