import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { enUS } from "date-fns/locale";

export const formatFullDate = (
  date: Date | string,
  timezone: string = "Asia/Jakarta"
) => {
  const zonedTime = toZonedTime(new Date(date), timezone);
  return format(zonedTime, "EEEE, MMMM dd, yyyy", {
    locale: enUS,
  });
};
