import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {

  const { data: cabins, isLoading, isError } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  });

  const filterValue = useSearchParams()[0].get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') {
    filteredCabins = cabins;
  }
  if (filterValue === 'no-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount <= 0)
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount > 0)
  }

  const sortBy = useSearchParams()[0].get('sortBy') || 'name-asc';

  const [sort, direction] = sortBy.split('-');

  const sortedCabins = filteredCabins?.sort((a, b) => {
    return direction === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
  });

  return { sortedCabins, isLoading, isError }
}