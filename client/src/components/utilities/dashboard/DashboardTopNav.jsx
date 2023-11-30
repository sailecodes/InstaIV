import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Logo from "../general/Logo";
import axiosFetch from "../../../utilities/axiosFetch";
import LogoutIcon from "../icons/LogoutIcon";

const DashboardTopNavWrapper = styled.nav`
  grid-row: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-black);
  color: var(--color-white);

  padding: 2rem;
  border-bottom: 1px solid var(--color-dark-gray);

  @media (min-width: 767px) {
    display: none;
  }
`;

const DashboardTopNav = () => {
  const logout = useMutation({
    mutationFn: () => {
      return axiosFetch.get("/auth/logout");
    },
  });

  return (
    <DashboardTopNavWrapper>
      <Logo />
      <NavLink to={`/`} onClick={logout.mutate}>
        <LogoutIcon />
      </NavLink>
    </DashboardTopNavWrapper>
  );
};

export default DashboardTopNav;
