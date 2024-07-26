import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import SpinnerMini from "../../ui/SpinnerMini";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading, isError } = useBooking();
  const { checkIn, isPendingCheckin } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid);
    }
  }, [booking]);

  if (isLoading) return <Spinner />

  if (isError) return <p>an error occurred</p>

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const totalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (addBreakfast) {
      return checkIn({
        id: bookingId,
        hasBreakfast: true,
        extrasPrice: totalBreakfastPrice,
        totalPrice: totalPrice + totalBreakfastPrice
      })
    }
    checkIn({ id: bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(prev => !prev);
              setConfirmPaid(false);
            }}
            disabled={isPendingCheckin || isLoadingSettings}
          >
            Want to add breakfast for {formatCurrency(totalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isPendingCheckin || isLoadingSettings}
          onChange={() => setConfirmPaid(true)}
        >
          I confirm that {guests?.fullName} has paid the total amount of {addBreakfast ? `${formatCurrency(totalPrice + totalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(totalBreakfastPrice)})` : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>


      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isPendingCheckin || isLoadingSettings}>{isPendingCheckin && <SpinnerMini />} Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
