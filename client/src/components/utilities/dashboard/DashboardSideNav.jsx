import { NavLink } from "react-router-dom";
import { useContext } from "react";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";
import DashboardSideNavWrapper from "../../../assets/styles/utilities/dashboard/DashboardSideNavWrapper";
import LogoutIcon from "../icons/LogoutIcon";
import { AppContext } from "../../../App";
import { useMutation } from "@tanstack/react-query";
import axiosFetch from "../../../utilities/axiosFetch";

const DashboardSideNav = () => {
  const { userId, userProfilePictureUrl } = useContext(AppContext);

  const logout = useMutation({
    mutationFn: () => {
      return axiosFetch.get("/auth/logout");
    },
  });

  return (
    <DashboardSideNavWrapper>
      <Logo />
      <div className="side-nav--links-container">
        <NavLink to="/dashboard" end>
          <HomeIcon />
          <p className="side-nav--link">Home</p>
        </NavLink>
        <NavLink to="/dashboard/search">
          <SearchIcon />
          <p className="side-nav--link">Search</p>
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
          <p className="side-nav--link">Create</p>
        </NavLink>
        <NavLink to={`/dashboard/profile/${userId}`} reloadDocument={true}>
          <ProfilePicture width={"3rem"} height={"3rem"} profilePictureUrl={userProfilePictureUrl} />
          <p className="side-nav--link">Profile</p>
        </NavLink>
        <NavLink to={`/`} onClick={logout.mutate}>
          <LogoutIcon />
          <p className="side-nav--link">Logout</p>
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
