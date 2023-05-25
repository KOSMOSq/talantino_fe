import { Tooltip, Typography } from "@mui/material";
import {
    getBeautifulTimeString,
    getRelativeTime
} from "../../functions/getRelativeTime";

const ProofTime = ({
    date,
    typoSx = { width: "max-content", fontSize: "12px", color: "#888888" }
}) => {
    return (
        <>
            <Tooltip
                sx={{ marginBottom: "-15px" }}
                title={getBeautifulTimeString(date)}
                arrow
                placement="top"
                enterDelay={400}
                enterNextDelay={400}
            >
                <Typography sx={typoSx}>{getRelativeTime(date)}</Typography>
            </Tooltip>
        </>
    );
};

export { ProofTime };
