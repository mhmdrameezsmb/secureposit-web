import { clsx, type ClassValue } from "clsx";
import debounce from "lodash/debounce";
import m from "moment-timezone";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: string, format?: string): string =>
  // m(date).format(format || "MM/DD/yyyy hh:mm A");
  m(date).format(format || "MM/DD/yyyy");

export const timeFormat = (time: string, format?: string): string =>
  m(time, "HH:mm:ss").format(format || "h:mm A");

export const dateFormatnotime = (date: string, format?: string): string =>
  m(date).format(format || "MM/DD/yyyy");

export const formatPhoneNumber = (phoneNumberString: string): string => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return "";
};
export const calculateAge = (dob: string): number => {
  // Convert the date of birth string to a Date object
  const dobDate: Date = new Date(dob);
  // Get the current date
  const currentDate: Date = new Date();

  // Calculate the difference in years
  const age: number =
    currentDate.getFullYear() -
    dobDate.getFullYear() -
    (currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
      ? 1
      : 0);
  return age;
};

export { debounce };
