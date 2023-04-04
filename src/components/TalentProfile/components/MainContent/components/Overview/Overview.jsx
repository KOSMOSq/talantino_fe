import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

const Overview = ({ talentDescription }) => {
    return (
        <>
            <Box>
                <Typography variant="h5" component="h5" mt={2} sx={{ fontWeight: 'bold' }}>
                    About
                </Typography>
                <Typography variant="h6" component="h6" mt={2} mb={2}>
                    {talentDescription ? <ReactMarkdown children={talentDescription} remarkPlugins={[[remarkEmoji, {emoticon: true}], remarkGfm]}/> :
                        <Typography variant="p" component="p" sx={{ fontSize: "18px", color: "#888888" }}>
                            There you can write about yourself or describe your talents.<br />
                            Only registered users will see this information.</Typography>
                    }
                </Typography>
            </Box>
        </>
    );
};

export { Overview };