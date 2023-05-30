import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as FooterArrowImg } from "../../../../assets/icons/footerArrow.svg";
import styles from "./FooterLinks.module.css";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../../redux/reducers/appReducer";

const FooterLinks = () => {
    const dispatch = useDispatch();
    return (
        <>
            <Box
                display="flex"
                justifyContent="space-evenly"
                pt="2rem"
                pb="1rem"
            >
                <Link to="/about" className={styles.link}>
                    About us
                </Link>
                <Link to="/welcome" className={styles.link}>
                    Welcome page
                </Link>
                <Box width="6.875rem">
                    <IconButton size="small" href="#top">
                        <FooterArrowImg />
                    </IconButton>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" pb="2rem">
                <Typography
                    width="max-Content"
                    textAlign="center"
                    color="white"
                    fontSize="1.5rem"
                    fontWeight="400"
                    onClick={e => {
                        dispatch(
                            setMessage("Email copied to clipboard!", "success")
                        );
                        navigator.clipboard.writeText(e.target.innerText);
                    }}
                    sx={{
                        cursor: "pointer",
                        ":hover": {
                            textDecoration: "underline"
                        }
                    }}
                >
                    talantino-team@outlook.com
                </Typography>
            </Box>
        </>
    );
};

export { FooterLinks };
