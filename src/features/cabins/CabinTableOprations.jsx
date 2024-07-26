import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const options = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'No Discount',
    value: 'no-discount'
  },
  {
    label: 'With Discount',
    value: 'with-discount'
  },
];

const sortByOptions = [
  {
    label: 'Sort by name (A-Z)',
    value: 'name-asc'
  },
  {
    label: 'Sort by name (Z-A)',
    value: 'name-desc'
  },
  {
    label: 'Sort by price (low to high)',
    value: 'reqularPrice-asc'
  },
  {
    label: 'Sort by price (high to low)',
    value: 'reqularPrice-desc'
  },
  {
    label: 'Sort by capacity (low to high)',
    value: 'maxCapacity-asc'
  },
  {
    label: 'Sort by capacity (high to low)',
    value: 'maxCapacity-desc'
  },
];

function CabinTableOprations() {
  return (
    <TableOperations>
      <Filter filterName="discount" options={options} />
      <SortBy options={sortByOptions} />
    </TableOperations>
  )
}

export default CabinTableOprations;
