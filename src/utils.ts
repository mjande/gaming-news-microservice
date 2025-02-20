import { Dayjs } from "dayjs";

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

/* Takes an endDate and number of days as arguments, and returns a formatted
 * string that can be used in a filter query for requests to GameSpot API
 */
export function convertToDateRangeQuery(endDate: Dayjs, days: number) {
  const startDate = endDate.subtract(days, "days");
  return `publish_date:${startDate.toISOString()}|${endDate.toISOString()}`;
}
