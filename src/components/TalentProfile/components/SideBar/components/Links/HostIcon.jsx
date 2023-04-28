import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

const HostIcon = ({ hostname }) => {
    switch (hostname) {
        case "github.com":
        case "www.github.com":
            return <GitHubIcon sx={{ fontSize: 35 }} />;
        case "linkedin.com":
        case "www.linkedin.com":
            return <LinkedInIcon sx={{ fontSize: 35 }} />;
        case "instagram.com":
        case "www.instagram.com":
            return <InstagramIcon sx={{ fontSize: 35 }} />;
        case "www.t.me":
        case "t.me":
            return <TelegramIcon sx={{ fontSize: 35 }} />;
        default:
            return <OpenInNewIcon sx={{ fontSize: 35 }} />;
    }
};

export { HostIcon };
