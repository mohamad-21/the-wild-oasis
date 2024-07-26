import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";

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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isPending } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <label htmlFor="password">Password (min 8 characters)</label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", {
            required: "password field is required",
            minLength: {
              value: 8,
              message: "password should be minimum of 8 characters",
            },
          })}
        />

        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "confirm password do not match",
            validate: (value) =>
              getValues().password === value || "confirm password do not match",
          })}
        />
        {errors?.passwordConfirm?.message && <Error>{errors.passwordConfirm.message}</Error>}
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isPending}>{isPending && <SpinnerMini />} Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
