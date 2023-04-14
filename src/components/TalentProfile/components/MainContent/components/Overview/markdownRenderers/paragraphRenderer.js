import { Typography } from "@mui/material";

export const paragraphRenderer = props => {
    return (
        <Typography
            {...props}
            component="p"
            fontWeight={400}
            fontSize={"18px"}
        />
    );
};
