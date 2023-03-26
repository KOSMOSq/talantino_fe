import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, IconButton, Link } from "@mui/material";

function Links({ talentLinks }) {

  // TODO: implement setting icon for different hostname links
  // * Can be used for set icon for different hostname links
  // const url = new URL('http://example.com/path/index.html');
  // console.log(url.hostname); // => 'example.com'

  return (
    <Box mt={2}>
      {talentLinks.map((item) => {
        return (
          <IconButton>
            <Link href={item.url}>
              <InstagramIcon variant="contained" sx={{ fontSize: 35 }}/>
            </Link>
          </IconButton>
        )
      })}
    </Box>
  )
}

export { Links };