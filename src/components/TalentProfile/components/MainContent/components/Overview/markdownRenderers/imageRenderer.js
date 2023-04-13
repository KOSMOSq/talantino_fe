export const ImageRenderer = props => {
    return (
        <img
            {...props}
            alt="image"
            style={{
                objectFit: "contain",
                objectPosition: "left",
                maxWidth: "100%",
                maxHeight: "600px"
            }}
        />
    );
};
