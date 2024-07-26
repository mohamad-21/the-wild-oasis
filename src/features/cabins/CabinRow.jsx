import styled from "styled-components";
import { deleteCabin } from '../../services/apiCabins';
import { formatCurrency } from '../../utils/helpers';
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import CreateCabinForm from './CreateCabinForm';
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  `;

const Img = styled.img`
  display: block;
  width: 100%;
  max-width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const queryClient = useQueryClient();

  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  const deleteMutation = useMutation({
    mutationFn: deleteCabin,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      toast.success('cabin has been deleted');
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  return (
    <>
      <Table.Row role="row">
        {image ? (
          <>
            {!isImageLoaded && <Spinner style={{ margin: 0, width: '4rem' }} />}
            <Img style={{ display: isImageLoaded ? 'block' : 'none' }} src={image} onLoad={() => setIsImageLoaded(true)} />
          </>
        ) : <div><MdOutlineImageNotSupported size={35} /></div>}
        <Cabin>{name}</Cabin>
        <div>fits up {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Row type="horizontal" style={{ gap: 8 }}>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open openKey="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open openKey="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window openKey="edit">
                <CreateCabinForm isEditForm cabin={{ name, maxCapacity, regularPrice, discount, image, description }} id={id} />
              </Modal.Window>
              <Modal.Window openKey="delete">
                <ConfirmDelete
                  resourceName={name}
                  onConfirm={() => deleteMutation.mutate(id)}
                  disabled={deleteMutation.isPending}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Row>
      </Table.Row>
    </>
  )
}