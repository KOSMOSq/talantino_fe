import style from "./Page404.module.css";

const Page404 = () => {
    return (
        <div className={style.wrapper}>
            <section className={style.container}>
                <div className={style.img}>
                    <img
                        src="https://assets.codepen.io/5647096/backToTheHomepage.png"
                        alt="Back to the Homepage"
                    />
                    <img
                        src="https://assets.codepen.io/5647096/Delorean.png"
                        alt="El Delorean, El Doc y Marti McFly"
                    />
                </div>
                <div className={style.text}>
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
