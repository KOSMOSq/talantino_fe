import { Box, IconButton, Link } from "@mui/material";
import { HostIcon } from "./HostIcon";

function Links({ talentLinks }) {
    return (
        <Box mt={2}>
            {talentLinks.map((item, index) => {
                if (!item) {
                    return null;
                }

                const hostname = new URL(item).hostname;

                return (
                    <IconButton key={index}>
                        <Link href={item} target="_blank">
                            <HostIcon hostname={hostname} />
                        </Link>
                    </IconButton>
                );
            })}
        </Box>
    );
}

export { Links };
