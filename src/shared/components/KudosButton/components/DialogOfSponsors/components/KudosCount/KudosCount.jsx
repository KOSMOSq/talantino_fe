import { Tooltip, Typography } from "@mui/material";

const KudosCount = ({ counter, handleOpen, formatter }) => {
    return (
        <Tooltip
            title={`${counter}, press to see sponsors who kudosed`}
            arrow
            placement="right"
            enterDelay={200}
            enterNextDelay={200}
            leaveDelay={100}
        >
            <Typography
                onClick={handleOpen}
                component="div"
                sx={{
                    cursor: "default",
                    ":hover": {
                        textDecoration: "underline"
                    }
                }}
            >
                {formatter.format(counter)}
            </Typography>
        </Tooltip>
    );
};

export { KudosCount };
