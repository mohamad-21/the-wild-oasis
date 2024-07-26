import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
import { useLogin } from "./useLogin";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
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

function LoginForm() {
  const { login, isPending } = useLogin();
  const [email, setEmail] = useState("wyattmohammad1371017@gmail.com");
  const [password, setPassword] = useState("12345678");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return toast.error('fields are required');

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <label htmlFor="email">Email Address</label>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isPending}>
          {isPending ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
