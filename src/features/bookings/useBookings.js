import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PER_PAGE } from "../../utils/constants";
import { findQueryKey } from "../../utils/helpers";

export function useBookings() {

  const queryClient = useQueryClient();

  const filterValue = useSearchParams()[0].get('status');
  const [sortValue, direction] = (useSearchParams()[0].get('sortBy') || 'startDate-desc').split('-');

  const filter = !filterValue || filterValue === 'all' ? null : {
    field: 'status',
    value: filterValue,
  };

  const sort = {
    field: sortValue,
    direction: direction
  }

  const page = Number(useSearchParams()[0].get('page')) || 1;

  const { data: { data: bookings, count } = {}, isLoading, isError } = useQuery({
    queryKey: ['bookings', filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),

  })

  const totalPages = Math.ceil(count / PER_PAGE);

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page }),
    });
  }

  return { bookings, isLoading, isError, count }
}