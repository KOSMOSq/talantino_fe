export const ImageRenderer = props => {
    return (
        <img
            {...props}
            alt="markdown"
            style={{
                objectFit: "contain",
                objectPosition: "left",
                maxWidth: "100%",
                maxHeight: "600px"
            }}
        />
    );
};
