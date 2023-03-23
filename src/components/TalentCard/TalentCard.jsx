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
            <Card sx={{ width:300, height: 165, borderRadius: "12px" }} title={isAuth ? `${name} ${surname}` : "You need to log in to see talent profiles"}>
                <CardActionArea onClick={handleClick} >
                    <CardMedia
                        component="img"
                        height="95"
                        alt="Talent Avatar"
                        image={profilePicture ? profilePicture : "errorTrigger"}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = noPictureFallback;
                        }}
                    />
                    <CardContent sx={{
                        padding: "8px",
                        display: "flex", 
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Typography variant="h6" component="div" sx={{ fontSize: "16px", fontWeight: "bold" }}>
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