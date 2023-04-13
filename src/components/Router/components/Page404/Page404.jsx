import style from "./Page404.css";

const Page404 = () => {
    return (
        <div className="page404Wrapper">
            <section className="page404Container">
                <div className="page404Img">
                    <img
                        src="https://assets.codepen.io/5647096/backToTheHomepage.png"
                        alt="Back to the Homepage"
                    />
                    <img
                        src="https://assets.codepen.io/5647096/Delorean.png"
                        alt="El Delorean, El Doc y Marti McFly"
                    />
                </div>
                <div className="page404Text">
                    <h1>404</h1>
                    <h2>PAGE NOT FOUND</h2>
                    <h3>BACK TO HOME?</h3>
                    <a href="/">YES</a>
                    <a
                        href="https://www.youtube.com/watch?v=G3AfIvJBcGo"
                        target="_blank"
                    >
                        NO
                    </a>
                </div>
            </section>
        </div>
    );
};

export { Page404 };
