import { Box, IconButton, Link } from "@mui/material";
import { HostIcon } from "./HostIcon";

function Links({ talentLinks }) {
    return (
        <Box mt={1} ml="-8px">
            {talentLinks.map((item, index) => {
                if (!item) {
                    return null;
                }

                const hostname = new URL(item).hostname;

                return (
                    <IconButton
                        key={index}
                        width="35px"
                        height="35px"
                        title={item}
                    >
                        <Link
                            href={item}
                            target="_blank"
                            width="35px"
                            height="35px"
                        >
                            <HostIcon hostname={hostname} />
                        </Link>
                    </IconButton>
                );
            })}
        </Box>
    );
}

export { Links };
