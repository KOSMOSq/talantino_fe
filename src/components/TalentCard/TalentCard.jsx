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
                width: {
                    xs: 300, //0
                    sm: 300, //600
                    md: 300, //900
                    lg: 300, //1200
                    xl: 300, //1536
                },
                height: {
                    xs: 165, //0
                    sm: 165, //600
                    md: 165, //900
                    lg: 165, //1200
                    xl: 165, //1536
                }, borderRadius: "12px"
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
                        width: "60%",
                    
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
                        width: "30%",
                        textAlign: "center",
                    }}>
                                                
                        <Typography variant="h6" component="h6" sx={{ fontSize: "16px", fontWeight: "bold"}}>
                            {name} {"Рогозянськsgsgйблала"}
                        </Typography>
                        <Chip label={kindOfTalent} color="primary" size="small" />
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export { TalentCard };