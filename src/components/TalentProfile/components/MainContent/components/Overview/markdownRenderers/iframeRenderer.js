let titleId = 0;
export const iframeRenderer = props => {
    titleId += 1;
    return (
        <iframe
            {...props}
            title={props.title + ` ${titleId}`}
            style={{ maxWidth: "100%", maxHeight: "500px" }}
        />
    );
};
