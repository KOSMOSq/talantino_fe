import {
    Avatar,
    Chip,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noPictureFallback from "../../../../assets/pictures/noPictureFallback.svg";
import { setClikedId } from "../../../../redux/reducers/talentsReducer";

function TalentListCard({ name, surname, profilePicture, kindOfTalent, id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //перенести в компонент вище, redux має бути на найвищому рівні
    const isAuth = useSelector(store => store.auth.isAuth);

    const handleClick = e => {
        e.preventDefault();
        if (!isAuth) {
            dispatch(setClikedId(id));
        }
        navigate(`/talent/${id}`);
    };

    return (
        <>
            <ListItem
                component="a"
                href={`/talent/${id}`}
                title={
                    isAuth
                        ? `${name} ${surname}`
                        : "You need to log in to see talent profiles"
                }
                onClick={handleClick}
                sx={{
                    transition: "background 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": { background: "#f6f6f6" }
                }}
            >
                <ListItemAvatar>
                    <Avatar
                        sx={{ width: "100px", height: "100px" }}
                        sizes={"medium"}
                        alt={`${name} ${surname}`}
                        src={
                            profilePicture ? profilePicture : noPictureFallback
                        }
                    />
                </ListItemAvatar>
                <ListItemText
                    sx={{ marginLeft: "2vw" }}
                    primary={
                        <Typography
                            sx={{
                                display: "inline",
                                fontSize: 24,
                                fontWeight: "bold"
                            }}
                            component="h6"
                            variant="h6"
                            color="text.primary"
                        >
                            {name} {surname}
                        </Typography>
                    }
                    secondary={
                        <Chip
                            component="span"
                            sx={{
                                fontSize: 18
                            }}
                            label={kindOfTalent}
                            color="primary"
                            size="small"
                        />
                    }
                ></ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}

export { TalentListCard };
