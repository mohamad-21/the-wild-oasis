import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const urlDays = Number(searchParams.get('last')) || 7;
  const days = subDays(new Date(), urlDays).toISOString();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', `last-${urlDays}-days`],
    queryFn: () => getBookingsAfterDate(days)
  });

  return { bookings, isLoading };
}