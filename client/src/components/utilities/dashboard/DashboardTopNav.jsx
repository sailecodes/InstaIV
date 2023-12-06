import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Logo from "../general/Logo";
import axiosFetch from "../../../utilities/axiosFetch";
import LogoutIcon from "../icons/LogoutIcon";
import DashboardTopNavWrapper from "../../../assets/styles/pages/dashboard/DashboardTopNavWrapper";

const DashboardTopNav = () => {
  const logout = useMutation({
    mutationFn: () => {
      return axiosFetch.get("/auth/logout");
    },
    onSuccess: () => {
      localStorage.clear();
    },
  });

  return (
    <DashboardTopNavWrapper>
      <Logo />
      <NavLink
        to={`/`}
        onClick={logout.mutate}>
        <LogoutIcon fill="var(--color-white)" />
      </NavLink>
    </DashboardTopNavWrapper>
  );
};

export default DashboardTopNav;
