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

    const cardWidthBreakpoints = {
        xs: 300, //0
        sm: 210, //600
        md: 260, //900   
        lg: 300, //1200  
        xl: 350, //1536
    }

    const cardHeightBreakpoints = {
        xs: 120, //0
        sm: 130, //600
        md: 130, //900 
        lg: 135, //1200 
        xl: 160, //1536
    }

    const cardFontBreakpoints = {
        xs: 12, //0
        lg: 16, //1200 
        xl: 20, //1536
    }

    const chipFontBreakpoints = {
        xs: 10, //0
        lg: 14, //1200 
        xl: 18, //1536
    }

    return (
        <>
            <Card sx={{
                width: cardWidthBreakpoints,
                height: cardHeightBreakpoints, //same as cardMedia
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
                                height: cardHeightBreakpoints, //same as card
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
                        alignItems: "center",
                    }}>
                        <Typography
                            variant="h6"
                            component="h6"

                            sx={{
                                fontSize: cardFontBreakpoints,
                                fontWeight: "bold",
                                textAlign: "center",
                                overflow: "hidden"
                            }}
                        >
                            {name} {surname}
                        </Typography>
                        <Chip sx={{
                            fontSize: chipFontBreakpoints
                        }} label={kindOfTalent} color="primary" size="small" />
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export { TalentCard };
