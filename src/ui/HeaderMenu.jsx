import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkmodeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
`;

function HeaderMenu() {

  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu;
