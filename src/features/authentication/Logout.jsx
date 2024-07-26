import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';

function Logout() {

  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoggingOut}>
      <HiOutlineLogout size={20} />
    </ButtonIcon>
  )
}

export default Logout;
