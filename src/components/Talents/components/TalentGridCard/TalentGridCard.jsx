import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import {
    Avatar,
    Box,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Skeleton,
    Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setClikedId } from "../../../../redux/reducers/talentsReducer";

const TalentGridCard = ({
    name,
    surname,
    profilePicture,
    kindOfTalent,
    id,
    isLoading
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(store => store.auth.isAuth);

    const handleClick = e => {
        if (id !== undefined) {
            e.preventDefault();
            if (!isAuth) {
                navigate(`/login`);
                dispatch(setClikedId(id));
                return;
            }
            navigate(`/talent/${id}`);
        }
    };

    const cardWidthBreakpoints = {
        xs: 300, //0
        sm: 210, //600
        md: 260, //900
        lg: 300, //1200
        xl: 350 //1536
    };

    const cardHeightBreakpoints = {
        xs: 120, //0
        sm: 130, //600
        md: 130, //900
        lg: 135, //1200
        xl: 160 //1536
    };

    const cardFontBreakpoints = {
        xs: 12, //0
        lg: 16, //1200
        xl: 20 //1536
    };

    const chipFontBreakpoints = {
        xs: 10, //0
        lg: 14, //1200
        xl: 18 //1536
    };

    return !isLoading ? (
        <Grid item>
            <Card
                sx={{
                    width: cardWidthBreakpoints,
                    height: cardHeightBreakpoints, //same as cardMedia
                    borderRadius: "12px"
                }}
                title={
                    !isLoading
                        ? isAuth
                            ? `${name} ${surname}`
                            : "You need to log in to see talent profiles"
                        : ""
                }
            >
                <CardActionArea
                    component="a"
                    href={!isLoading ? `/talent/${id}` : null}
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
                        >
                            <Avatar
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "72px"
                                }}
                                variant="square"
                                alt={name + " " + surname}
                                src={profilePicture}
                            >
                                {!isLoading ? name.slice(0, 1) : null}
                            </Avatar>
                        </CardMedia>
                    </Box>
                    <CardContent
                        sx={{
                            width: "50%",
                            height: "100%",
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{
                                fontSize: cardFontBreakpoints,
                                fontWeight: "bold",
                                textAlign: "center",
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            {name} {surname}
                        </Typography>
                        <Chip
                            sx={{
                                fontSize: chipFontBreakpoints
                            }}
                            label={kindOfTalent}
                            color="primary"
                            size="small"
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    ) : (
        <Grid item>
            <Skeleton
                sx={{
                    width: cardWidthBreakpoints,
                    height: cardHeightBreakpoints,
                    borderRadius: "12px"
                }}
            />
        </Grid>
    );
};

export { TalentGridCard };
