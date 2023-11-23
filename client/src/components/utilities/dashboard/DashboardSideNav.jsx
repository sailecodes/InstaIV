import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import MessagesIcon from "../icons/MessagesIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";
import { DashboardContext } from "../../pages/dashboard/Dashboard";

const DashboardSideNavWrapper = styled.nav`
  a {
    color: var(--color-white);

    height: 5rem;

    text-decoration: none;

    padding: 1rem;
    border-radius: 8px;

    transition: background-color 0.2s;
  }

  a:hover {
    background-color: var(--color-darker-gray);
  }

  .dashboard--side-nav-link-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .active svg {
    stroke: none;
    fill: var(--color-white);
  }

  .active p {
    font-weight: 600;
  }

  .dashboard-link.full-screen {
    font-size: var(--font-sm-2);
  }
`;

const DashboardSideNav = () => {
  const { profilePictureUrl } = useContext(DashboardContext);

  return (
    <DashboardSideNavWrapper className="dashboard--side-nav">
      <Logo />
      <div className="dashboard--side-nav-link-container">
        <NavLink
          to="/dashboard"
          end>
          <HomeIcon />
          <p className="dashboard-link full-screen">Home</p>
        </NavLink>
        <NavLink to="/dashboard/search">
          <SearchIcon />
          <p className="dashboard-link full-screen">Search</p>
        </NavLink>
        <NavLink to="/dashboard/messages">
          <MessagesIcon />
          <p className="dashboard-link full-screen">Messages</p>
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
          <p className="dashboard-link full-screen">Create</p>
        </NavLink>
        <NavLink to="/dashboard/profile">
          <ProfilePicture
            width={"3rem"}
            height={"3rem"}
            profilePictureUrl={profilePictureUrl}
          />
          <p className="dashboard-link full-screen">Profile</p>
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
