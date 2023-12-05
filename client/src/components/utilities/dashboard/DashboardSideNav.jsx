import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";
import DashboardSideNavWrapper from "../../../assets/styles/pages/dashboard/DashboardSideNavWrapper";
import LogoutIcon from "../icons/LogoutIcon";
import axiosFetch from "../../../utilities/axiosFetch";
import { AppContext } from "../../../App";

const DashboardSideNav = () => {
  const { userPfpUrl } = useContext(AppContext);

  const logout = useMutation({
    mutationFn: () => {
      return axiosFetch.get("/auth/logout");
    },
    onSuccess: () => {
      localStorage.clear();
    },
  });

  return (
    <DashboardSideNavWrapper>
      <Logo />
      <div className="side-nav--links-container">
        <NavLink
          to="/dashboard"
          end>
          <HomeIcon
            fill="var(--color-white)"
            stroke="none"
            width="3.3rem"
            height="3.3rem"
          />
          <p className="side-nav--link">Home</p>
        </NavLink>
        <NavLink to="/dashboard/search">
          <SearchIcon
            fill="var(--color-white)"
            stroke="none"
            width="3.3rem"
            height="3.3rem"
          />
          <p className="side-nav--link">Search</p>
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon
            fill="var(--color-white)"
            stroke="none"
            width="3.3rem"
            height="3.3rem"
          />
          <p className="side-nav--link">Create</p>
        </NavLink>
        <NavLink
          to={`/dashboard/profile/${localStorage.getItem("userId")}`}
          reloadDocument={true}>
          <ProfilePicture
            width={"3.3rem"}
            height={"3.3rem"}
            userPfpUrl={userPfpUrl}
          />
          <p className="side-nav--link">Profile</p>
        </NavLink>
        <NavLink
          to={`/`}
          onClick={logout.mutate}>
          <LogoutIcon
            fill="var(--color-white)"
            stroke="none"
            width="3.3rem"
            height="3.3rem"
          />
          <p className="side-nav--link">Logout</p>
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
