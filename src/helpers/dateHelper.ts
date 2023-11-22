import { format, parse } from "date-fns";

export const getConverterdDateToString = (date: Date | string): string => {
  const dateFormat = "dd.MM.yyyy";
  if (typeof date === "string") {
    const parsedData = parse(date, dateFormat, new Date());
    return format(parsedData, dateFormat);
  }
  return format(date, dateFormat);
};
