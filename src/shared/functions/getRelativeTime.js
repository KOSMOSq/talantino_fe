const timeUnits = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    week: (24 * 60 * 60 * 1000 * 30.4) / 4,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
};

const auto = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const getBeautifulTimeString = date => {
    const dateOBJ = new Date(getUTCdate(date));
    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };

    const dateString = dateOBJ.toLocaleDateString("en-US", options);
    const index = dateString.lastIndexOf(",");
    return dateString.slice(0, index) + dateString.slice(index + 1);
};

export const getUTCdate = date => {
    const dateOBJ = new Date(date);
    return Date.UTC(
        dateOBJ.getFullYear(),
        dateOBJ.getMonth(),
        dateOBJ.getDate(),
        dateOBJ.getHours(),
        dateOBJ.getMinutes(),
        dateOBJ.getSeconds()
    );
};
export const getRelativeTime = date => {
    const dateUTC = getUTCdate(date);
    const result = dateUTC - new Date();

    for (let item in timeUnits) {
        if (Math.abs(result) > timeUnits[item] || item === "second") {
            return auto.format(Math.round(result / timeUnits[item]), item);
        }
    }
};
