import styled from "styled-components";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin, editCabin } from '../../services/apiCabins';
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ isEditForm = false, cabin = null, id = null, onCloseModal }) {

  if (isEditForm && (!cabin || !id)) throw new Error('cabin data is empty');

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors },
    getValues, reset } = useForm({
      defaultValues: isEditForm && cabin
    });

  const addMutation = useMutation({
    mutationFn: isEditForm ? ({ newData, id }) => editCabin({ newData, id }) : addCabin,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      toast.success(isEditForm ? 'Cabin has been updated' : 'New Cabin has been created');
      reset();
      onCloseModal?.();
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    isEditForm ?
      addMutation.mutate({ newData: { ...data, image }, id })
      :
      addMutation.mutate({ ...data, image: image });
  }

  return (
    <Form type={onCloseModal ? 'modal' : 'reqular'} onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input disabled={addMutation.isPending} type="text" id="name" {...register('name', {
          required: 'name field is required'
        })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input disabled={addMutation.isPending} type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'maxCapacity field is required'
        })} />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input disabled={addMutation.isPending} type="number" id="regularPrice" {...register('regularPrice', {
          required: 'regularPrice field is required'
        })} />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input disabled={addMutation.isPending} type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'discount field is required',
          validate: (value) => Number(value) <= Number(getValues().regularPrice) || 'Discount cannot be greater than price'
        })} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea disabled={addMutation.isPending} id="description" defaultValue="" {...register('description', {
          required: 'description field is required'
        })} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput disabled={addMutation.isPending} id="image" accept="image/*" {...register('image', {
          required: isEditForm ? false : 'cabin photo field is required'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={addMutation.isPending} variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={(Object.keys(errors).length > 0) || addMutation.isPending}>{addMutation.isPending && <SpinnerMini />}{isEditForm ? 'Edit' : 'Add'} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;