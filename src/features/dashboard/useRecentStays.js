import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 7;
  const days = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ['stays', `last-${numDays}-stays`],
    queryFn: () => getStaysAfterDate(days)
  });

  const confirmedStays = stays?.filter(stay => stay.status !== 'unconfirmed')

  return { stays, confirmedStays, isLoading, numDays };
}