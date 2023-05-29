import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import { ProofTime } from "../../../../../../../shared/components/ProofTime/ProofTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const ProofAuthor = ({ isLoading, author, date, handleClick }) => {
    return (
        <Box
            display="flex"
            gap={1.2}
            sx={{ width: "100%", marginBottom: "6px" }}
        >
            {!isLoading ? (
                <Avatar
                    component={Link}
                    to={!isLoading ? `/talent/${author && author.id}` : null}
                    alt={author.name + " " + author.surname}
                    src={author.avatar}
                    sx={{
                        width: "46px",
                        height: "46px",
                        textDecoration: "none"
                    }}
                >
                    {author.name.slice(0, 1)}
                </Avatar>
            ) : (
                <Skeleton variant="circular" width={46} height={46}></Skeleton>
            )}
            <Box alignSelf="center" width="40%">
                <Typography
                    sx={{
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "#202020"
                    }}
                    component={Link}
                    to={!isLoading ? `/talent/${author.id}` : null}
                >
                    {!isLoading ? (
                        author.name + " " + author.surname
                    ) : (
                        <Skeleton width="70%" />
                    )}
                </Typography>
                {!isLoading ? (
                    <ProofTime date={date} />
                ) : (
                    <Skeleton width="40%" />
                )}
            </Box>
            {!isLoading ? (
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        alignSelf: "start",
                        marginLeft: "auto"
                    }}
                >
                    <MoreVertIcon />
                </IconButton>
            ) : null}
        </Box>
    );
};

export { ProofAuthor };
