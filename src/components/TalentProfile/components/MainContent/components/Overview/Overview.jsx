import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ImageRenderer } from "./markdownRenderers/imageRenderer";
import { paragraphRenderer } from "./markdownRenderers/paragraphRenderer";
import { iframeRenderer } from "./markdownRenderers/iframeRenderer";
import styles from "./Overview.module.css";

const Overview = ({ talentDescription }) => {
    return (
        <>
            <Box>
                <Typography
                    variant="h6"
                    component="h6"
                    mt={2}
                    mb={2}
                    sx={{ fontWeight: "bold" }}
                >
                    About
                </Typography>

                {talentDescription ? (
                    <ReactMarkdown
                        className={styles.reactMarkDown}
                        components={{
                            p: paragraphRenderer,
                            img: ImageRenderer,
                            iframe: iframeRenderer,
                            style: () => {
                                return;
                            }
                        }}
                        children={talentDescription}
                        remarkPlugins={[
                            [remarkEmoji, { emoticon: true }],
                            remarkGfm
                        ]}
                        rehypePlugins={[rehypeRaw]}
                    />
                ) : (
                    <Typography
                        component="p"
                        mt="6px"
                        mb={2}
                        sx={{
                            fontSize: "18px",
                            color: "#888888"
                        }}
                    >
                        There you can write about yourself or describe your
                        talents.
                        <br />
                        Only registered users will see this information.
                    </Typography>
                )}
            </Box>
        </>
    );
};

export { Overview };
