import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, IconButton, Link } from "@mui/material";

function Links({ talentInfo }) {
  
  // * Can be used for set icon for different hostname links
  // const url = new URL('http://example.com/path/index.html');
  // console.log(url.hostname); // => 'example.com'

  // TODO: implement setting icon for different hostname links

  return (
    <Box mt={2}>
      <IconButton>
        <Link href={talentInfo.links.url}>
          <InstagramIcon variant="contained" sx={{ fontSize: 35 }}/>
        </Link>
      </IconButton>
      <IconButton>
        <Link href={talentInfo.links.url}>
          <TelegramIcon variant="contained" sx={{ fontSize: 35 }}/>
        </Link>
      </IconButton>
      <IconButton>
        <Link href={talentInfo.links.url}>
          <FacebookIcon variant="contained" sx={{ fontSize: 35 }}/>
        </Link>
      </IconButton>
    </Box>
  )
}

export { Links };