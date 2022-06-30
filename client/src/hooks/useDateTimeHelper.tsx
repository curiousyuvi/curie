const midFromDate = function (date: Date) {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

const dateFromMid = (mid: string) => {
  return new Date(parseInt(mid.substring(0, 8), 16) * 1000);
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date: Date) => {
  const newDateFormat =
    date.getDate() +
    " " +
    monthNames[date.getMonth() - 1] +
    " " +
    date.getFullYear();
  const todayDate = new Date();

  const todayDateFormat =
    todayDate.getDate() +
    " " +
    monthNames[todayDate.getMonth() - 1] +
    " " +
    todayDate.getFullYear();

  const yesterdayDateFormat =
    todayDate.getDate() -
    1 +
    " " +
    monthNames[todayDate.getMonth() - 1] +
    " " +
    todayDate.getFullYear();

  if (newDateFormat === todayDateFormat) return "Today";
  else if (newDateFormat === yesterdayDateFormat) return "Yesterday";
  else return newDateFormat;
};

const formatTime = (date: Date) => {
  const hours =
    date.getHours() > 12
      ? date.getHours() - 12
      : date.getHours() < 10
      ? "0" + date.getHours()
      : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const am_pm = date.getHours() >= 12 ? "pm" : "am";
  return hours + ":" + minutes + " " + am_pm;
};

const useDateTimeHelper = () => {
  return { midFromDate, dateFromMid, formatDate, formatTime };
};

export default useDateTimeHelper;
