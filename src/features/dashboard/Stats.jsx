import React from "react";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {

  const sales = confirmedStays.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupancyRate = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinsCount)

  return (
    <>
      <Stat
        title='bookings'
        icon={<HiOutlineBriefcase />}
        value={bookings.length}
        color='blue'
      />
      <Stat
        title='Sales'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        color='green'
      />
      <Stat
        title='Check ins'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
        color='indigo'
      />
      <Stat
        title='Occupancy rate'
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
        color='yellow'
      />
    </>
  )
}

export default Stats;
