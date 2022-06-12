import moment from "moment";

export const isDateValid = (inputDate: string) => {
  return moment(inputDate, "DD.MM.YYYY", true).isValid();
};

export const isExpired = (inputDate?: string) => {
  if (!inputDate) {
    return false;
  }
  const now = moment();
  return moment(inputDate, "DD.MM.YYYY", true).add(1, "day").isBefore(now);
};
