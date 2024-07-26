import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { useSignup } from './useSignup';

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

function SignupForm() {

  const { signup, isPending } = useSignup();
  const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();

  function onSubmit(data) {
    signup(data, {
      onSuccess: reset
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <label htmlFor="fullName">
          Full name
        </label>
        <Input disabled={isPending} {...register('fullName', {
          required: 'full name is required'
        })} type="text" id="fullName" />
        {errors?.fullName?.message && <Error>{errors.fullName.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="email">
          Email address
        </label>
        <Input disabled={isPending} {...register('email', {
          required: 'email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please provide valid email'
          }
        })} type="email" id="email" />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="password">
          Password (min 8 characters)
        </label>
        <Input disabled={isPending} {...register('password', {
          required: 'password is required',
          minLength: {
            value: 8,
            message: 'password should be minimum of 8 characters'
          }
        })} type="password" id="password" />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="passwordConfirm">
          Repeat password
        </label>
        <Input disabled={isPending} {...register('passwordConfirm', {
          required: 'confirm password do not match',
          validate: (value) => getValues().password === value || 'confirm password do not match'
        })} type="password" id="passwordConfirm" />
        {errors?.passwordConfirm?.message && <Error>{errors.passwordConfirm.message}</Error>}
      </FormRow>

      <FormRow>
        <Button disabled={isPending} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>{isPending && <SpinnerMini />} {isPending ? 'Creating new user' : 'Create new user'}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
