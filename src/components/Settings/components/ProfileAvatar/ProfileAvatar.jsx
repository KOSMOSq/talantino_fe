import {
    Box,
    Avatar,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRef } from "react";

const ProfileAvatar = ({
    user,
    avatarSrc,
    handleFileChange,
    register,
    handleAvatarDelete
}) => {
    const { ref, ...restRegProps } = register("avatar", {
        onChange: handleFileChange
    });

    const avatarInputRef = useRef(null);

    const handleEditClick = () => {
        avatarInputRef.current.click();
    };

    return (
        <Box>
            <Avatar
                alt={user.name}
                src={avatarSrc || user.avatar}
                sx={{
                    width: 190,
                    height: 190,
                    fontSize: "64px"
                }}
            >
                {user.name.slice(0, 1)}
            </Avatar>
            <Box display="flex" justifyContent={"end"}>
                <SpeedDial
                    ariaLabel="SpeedDial for choosing an avatar action"
                    direction="down"
                    icon={<SpeedDialIcon />}
                    sx={{
                        marginTop: "-40px",
                        marginRight: "10px",
                        "& .MuiFab-primary": { width: 48, height: 48 },
                        "& .MuiSpeedDial-actions": {
                            paddingTop: "36px"
                        },
                        zIndex: 1
                    }}
                >
                    <SpeedDialAction
                        sx={{ margin: "6px" }}
                        icon={<EditIcon />}
                        tooltipTitle="Edit"
                        onClick={handleEditClick}
                    />
                    <SpeedDialAction
                        sx={{ margin: "6px" }}
                        icon={<DeleteForeverIcon />}
                        tooltipTitle="Delete"
                        onClick={handleAvatarDelete}
                    />
                </SpeedDial>
                <input
                    {...restRegProps}
                    ref={e => {
                        ref(e);
                        avatarInputRef.current = e;
                    }}
                    type="file"
                    accept="image/*"
                    hidden
                />
            </Box>
        </Box>
    );
};

export { ProfileAvatar };
