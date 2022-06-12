import moment from "moment";

/**
 * Method to validate a date in DD.MM.YYY format
 * @param inputDate - input date in string format
 * @returns boolean
 */
export const isDateValid = (inputDate: string) => {
  return moment(inputDate, "DD.MM.YYYY", true).isValid();
};

/**
 * Method to check if date is in past
 * @param inputDate - input date in string format
 * @returns boolean 
 */
export const isExpired = (inputDate?: string) => {
  if (!inputDate) {
    return false;
  }
  const now = moment();
  return moment(inputDate, "DD.MM.YYYY", true).add(1, "day").isBefore(now);
};
