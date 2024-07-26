import Spinner from '../../ui/Spinner';
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useCabins } from './useCabins';

export default function CabinTable() {

  const { sortedCabins, isLoading, isError } = useCabins();

  if (isLoading) return <Spinner />

  if (isError) return <p>an error occurred</p>

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => (
            <CabinRow key={cabin.id} cabin={cabin} />
          )}
        />
      </Table>
    </Menus>
  )
}