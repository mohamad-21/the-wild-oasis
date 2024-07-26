import { useEffect } from "react";
import { useUser } from '../features/authentication/useUser';
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
`

function ProtectedRoute({ children }) {
  const { user, isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate('/login');
    }
  }, [isPending, isAuthenticated]);

  if (isPending) return <Container><Spinner /></Container>

  if (isAuthenticated) return children;

}

export default ProtectedRoute;
