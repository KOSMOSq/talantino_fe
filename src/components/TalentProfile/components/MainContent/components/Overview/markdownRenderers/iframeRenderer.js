export const iframeRenderer = props => {
    return (
        <iframe
            {...props}
            style={{ maxWidth: "100%", maxHeight: "500px" }}
        ></iframe>
    );
};
