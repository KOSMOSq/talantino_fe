import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../../assets/logo/talantinoLogo.svg";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function AppBarItems() {
    const pages = ["Talents", "Proofs", "About"];
    const role = useSelector(store => store.auth.user.role);

    return (
        <Box display="flex" alignItems="center">
            <Link to="/talents">
                <img
                    src={logo}
                    alt="logo"
                    width={160}
                    style={{
                        borderRadius: "10px",
                        display: "block",
                        marginRight: "10px"
                    }}
                />
            </Link>
            {pages.map(page => (
                <Button
                    key={page}
                    component={NavLink}
                    to={`${page.toLowerCase()}`}
                    sx={{
                        padding: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                        fontSize: 20,
                        borderRadius: "10px"
                    }}
                >
                    {page}
                </Button>
            ))}
            {role && role === "ADMIN" ? (
                <Button
                    component={NavLink}
                    to={`kinds`}
                    sx={{
                        padding: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                        fontSize: 20,
                        borderRadius: "10px"
                    }}
                >
                    kinds
                </Button>
            ) : null}
        </Box>
    );
}

export { AppBarItems };
