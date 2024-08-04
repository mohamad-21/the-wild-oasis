import styled from "styled-components";
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import { Flag } from '../../ui/Flag';
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && (
        <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>Check In</Button>
      )}
      {status === 'checked-in' && (
        <CheckoutButton bookingId={id}>Check out</CheckoutButton>
      )}
      <Flag src={guests.countryFlag} alt="flg" />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>
    </StyledTodayItem>
  )
}
