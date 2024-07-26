import styled from "styled-components";
import LoginForm from '../features/authentication/LoginForm';
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {

  const queryClient = useQueryClient();

  const isLoggedIn = queryClient.getQueryData(['user']);

  if (isLoggedIn) return <Navigate to="/" />

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h1" style={{ textAlign: 'center' }}>Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  )
}

export default Login;
