export const getUnixEpochTime = (date: Date = new Date()) => {
  return Math.floor(date.getTime() / 1000);
};
