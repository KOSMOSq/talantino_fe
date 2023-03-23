import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Box, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import noPictureFallback from "../../assets/pictures/noPictureFallback.svg";

const TalentCard = ({ name, surname, profilePicture, kindOfTalent, id, isAuth }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/talent/${id}`);
    }

    return (
        <>
            <Card sx={{
                width: 300,
                height: 150, //same as cardMedia
                borderRadius: "12px"
            }} title={isAuth ? `${name} ${surname}` : "You need to log in to see talent profiles"}>
                <CardActionArea
                    sx={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                    onClick={handleClick}
                >
                    <Box sx={{ width: "50%" }}>
                        <CardMedia
                            sx={{
                                height: 150, //same as card
                                objectFit: "cover"
                            }}
                            component="img"
                            alt="Talent Avatar"
                            image={profilePicture ? profilePicture : "errorTrigger"}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = noPictureFallback;
                            }}
                        />
                    </Box>
                    <CardContent sx={{
                        width: "50%",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                textAlign: "center",
                                overflow: "hidden"
                            }}
                        >
                            {name} {surname}
                        </Typography>
                        <Chip label={kindOfTalent} color="primary" size="small" />
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export { TalentCard };