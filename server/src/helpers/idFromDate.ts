const idFromDate = function (date: Date) {
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

export default idFromDate