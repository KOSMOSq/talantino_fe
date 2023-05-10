import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, IconButton, Link } from "@mui/material";

function Links({ talentLinks }) {
    // TODO: implement setting icon for different hostname links
    // * Can be used for set icon for different hostname links
    // const url = new URL('http://example.com/path/index.html');
    // console.log(url.hostname); // => 'example.com'

    return (
        <Box mt={1}>
            {talentLinks.map((item, index) => {
                if (!item) {
                    return null;
                }
                return (
                    <IconButton key={index} width="36px" height="36px">
                        <Link href={item} target="_blank" width="36px" height="36px">
                            <OpenInNewIcon
                                variant="contained"
                                sx={{ fontSize: 36 }}
                            />
                        </Link>
                    </IconButton>
                );
            })}
        </Box>
    );
}

export { Links };
