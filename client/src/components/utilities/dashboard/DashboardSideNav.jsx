import { NavLink } from "react-router-dom";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import MessagesIcon from "../icons/MessagesIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";
import DashboardSideNavWrapper from "../../../assets/styles/utilities/dashboard/DashboardSideNavWrapper";
import { useContext } from "react";
import { AppContext } from "../../../App";

const DashboardSideNav = () => {
  const { userId } = useContext(AppContext);

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
        <NavLink to="/dashboard/messages">
          <MessagesIcon />
          <p className="side-nav--link">Messages</p>
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
          <p className="side-nav--link">Create</p>
        </NavLink>
        <NavLink to={`/dashboard/profile/${userId}`} reloadDocument={true}>
          <ProfilePicture width={"3rem"} height={"3rem"} />
          <p className="side-nav--link">Profile</p>
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
