import dayjs, { Dayjs } from "dayjs";

// Represents article data from GameSpot API
export interface ArticleData {
  title: string;
  deck: string;
  site_detail_url: string;
}

// Represents response data from GameSpot API
export interface ApiResponse {
  error: string;
  results: ArticleData[];
}

/* Takes a number of days and a date string, and returns a formatted
 * string representing the date range between the given date and however
 * many days before that date. This string can be used in a filter query for
 * requests to GameSpot API.
 */
export function getDateRangeParam(days: number, date?: string): string {
  let endDate = dayjs(date);
  // If given date isn't valid, today's date is used
  if (!endDate.isValid()) {
    endDate = dayjs();
  }

  const startDate = endDate.subtract(days, "days");
  return `publish_date:${startDate.toISOString()}|${endDate.toISOString()}`;
}
