import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useEffect } from "react";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, isError } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking, isSuccess } = useDeleteBooking();

  const moveBack = useMoveBack();

  useEffect(() => {
    if (isSuccess) moveBack();
  }, [isSuccess]);

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />

  if (isError) return <p>an error occurred</p>

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[booking?.status]}>{booking?.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open openKey="delete">
          <Button style={{ marginRight: 'auto' }} variation="danger" disabled={isDeletingBooking}>Delete Booking</Button>
        </Modal.Open>
        <Modal.Window openKey="delete">
          <ConfirmDelete
            resourceName={`Booking #${booking?.id}`}
            onConfirm={() => deleteBooking(booking?.id)}
            disabled={isDeletingBooking}
          />
        </Modal.Window>
        {booking?.status === 'checked-in' && (
          <Button
            onClick={() => checkout(booking?.id)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
