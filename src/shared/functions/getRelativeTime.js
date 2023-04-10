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

export const getRelativeTime = (date1, date2 = new Date()) => {
    const result = date1 - date2;
    for (let item in timeUnits) {
        if (Math.abs(result) > timeUnits[item] || item === "second") {
            return auto.format(Math.round(result / timeUnits[item]), item);
        }
    }
};
