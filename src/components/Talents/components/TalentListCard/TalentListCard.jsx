import {
    Avatar,
    Box,
    Chip,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClikedId } from "../../../../redux/reducers/talentsReducer";
import { ProofSkillsArea } from "../../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";

const TalentListCard = ({
    name,
    surname,
    profilePicture,
    kindOfTalent,
    id,
    skills = [],
    isLoading
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //перенести в компонент вище, redux має бути на найвищому рівні
    const isAuth = useSelector(store => store.auth.isAuth);

    const handleClick = e => {
        if (id !== undefined && !isLoading) {
            e.preventDefault();
            if (!isAuth) {
                navigate(`/login`);
                dispatch(setClikedId(id));
                return;
            }
            navigate(`/talent/${id}`);
        }
    };

    return (
        <>
            <ListItem
                component="a"
                href={!isLoading ? `/talent/${id}` : null}
                title={
                    !isLoading
                        ? isAuth
                            ? `${name} ${surname}`
                            : "You need to log in to see talent profiles"
                        : ""
                }
                onClick={handleClick}
                sx={{
                    transition: "background 0.2s ease-in-out",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    ":hover": { background: "#f6f6f6" }
                }}
            >
                <Box
                    display="flex"
                    justifyContent="start"
                    width="100%"
                    alignItems="center"
                >
                    <Box>
                        <ListItemAvatar>
                            {!isLoading ? (
                                <Avatar
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        fontSize: "48px"
                                    }}
                                    sizes={"medium"}
                                    alt={`${name} ${surname}`}
                                    src={profilePicture}
                                >
                                    {name.slice(0, 1)}
                                </Avatar>
                            ) : (
                                <Skeleton
                                    variant="circular"
                                    width="100px"
                                    height="100px"
                                />
                            )}
                        </ListItemAvatar>
                    </Box>
                    <Box width="100%" sx={{ marginLeft: "16px" }}>
                        <ListItemText
                            sx={{ mt: "0px" }}
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
                                    {!isLoading ? (
                                        name + " " + surname
                                    ) : (
                                        <Skeleton width="40%" />
                                    )}
                                </Typography>
                            }
                            secondary={
                                !isLoading ? (
                                    <Chip
                                        component="span"
                                        sx={{
                                            fontSize: 18,
                                            height: "28px",
                                            pl: "2px",
                                            pr: "2px"
                                        }}
                                        label={kindOfTalent}
                                        color="primary"
                                        size="small"
                                    />
                                ) : (
                                    <Skeleton
                                        variant="rounded"
                                        height="28px"
                                        width="25%"
                                        sx={{
                                            borderRadius: "16px"
                                        }}
                                    />
                                )
                            }
                        ></ListItemText>
                        <Box sx={{ mt: "16px" }}>
                            {!isLoading ? (
                                <ProofSkillsArea skills={skills} forTalent />
                            ) : (
                                <>
                                    <Box
                                        display="flex"
                                        flexWrap="wrap"
                                        sx={{
                                            width: "100%",
                                            marginTop: "8px"
                                        }}
                                        gap={0.8}
                                    >
                                        {Array(4)
                                            .fill("")
                                            .map((item, index) => (
                                                <Skeleton
                                                    key={index}
                                                    variant="rounded"
                                                    width={99}
                                                    height={24}
                                                    sx={{
                                                        borderRadius: "16px"
                                                    }}
                                                />
                                            ))}
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            </ListItem>
            <Divider
                variant="fullWidth"
                component="li"
                sx={{ mt: "5px", mb: "5px" }}
            />
        </>
    );
};

export { TalentListCard };
