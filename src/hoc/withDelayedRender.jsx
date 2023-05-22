import { useEffect, useState } from "react";

const withDelayedRender = (Component, delay) => props => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    if (!showComponent) {
        return null;
    }

    return <Component {...props} />;
};

export { withDelayedRender };
