import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import noPictureFallback from "../../assets/pictures/noPictureFallback.svg";

const TalentCard = ({ name, surname, profilePicture, kindOfTalent, id, isAuth }) => {

    //const navigate = useNavigate();

    const handleClick = () => {
        //navigate(`/talent/${id}`);
    }

    return (
        <>
            <Card sx={{
                , borderRadius: "12px"
            }} title={isAuth ? `${name} ${surname}` : "You need to log in to see talent profiles"}>
                <CardActionArea
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "inherit",
                        width: "inherit"
                    }}
                    onClick={handleClick} >
                    
                    <CardMedia
                    sx={{
                        objectFit: "cover",
                        height: "inherit",
                        width: "50%",
                    
                    }}
                    component="img"
                    
                    // height={{
                    //     xs: 0, //0
                    //     sm: 80, //600
                    //     md: 20, //900
                    //     lg: 300, //1200
                    //     xl: 300, //1536
                    // }}
                    alt="Talent Avatar"
                    image={profilePicture ? profilePicture : "errorTrigger"}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noPictureFallback;
                    }}
                    />
                    
                    
                    <CardContent sx={{
                        
                        display: "flex", 
                        flexDirection: "column",
                        alignItems: "center",
                        width: "50%",
                        textAlign: "center",
                    }}>
                                                
                        <Typography variant="h6" component="h6" sx={{ fontSize: "16px", fontWeight: "bold"}}>
                            {name} {"Рогозянсблала"}
                        </Typography>
                        <Chip label={kindOfTalent} color="primary" size="small" />
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export { TalentCard };