import { Box, Avatar, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileAvatar = ({ user, avatarSrc, handleFileChange, register }) => {
    return (
        <Box>
            <Avatar
                alt={user.name}
                src={avatarSrc || user.avatar || "error"}
                sx={{
                    width: 190,
                    height: 190,
                    fontSize: "64px"
                }}
            />
            <Box display="flex" justifyContent={"end"}>
                <Tooltip title="Upload file">
                    <IconButton
                        component="label"
                        sx={{
                            backgroundColor: "white",
                            [":hover"]: {
                                backgroundColor: "#f1f1f1"
                            },
                            boxShadow: 4,
                            marginTop: "-40px",
                            marginRight: "10px"
                        }}
                    >
                        <input
                            {...register("avatar", {
                                onChange: handleFileChange
                            })}
                            type="file"
                            accept="image/*"
                            hidden
                        />
                        <EditIcon color="primary" fontSize="medium" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export { ProfileAvatar };
