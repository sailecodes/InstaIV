import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import MessagesIcon from "../icons/MessagesIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";

const DashboardSideNavWrapper = styled.nav`
  a {
    color: var(--color-white);

    height: 3rem;

    text-decoration: none;
  }

  .dashboard--side-nav-link-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .active svg {
    stroke: none;
    fill: var(--color-white);
  }

  .active p {
    font-weight: 600;
  }

  .full {
    font-size: var(--font-sm-2);
  }
`;

const DashboardSideNav = () => {
  return (
    <DashboardSideNavWrapper className="dashboard--side-nav">
      <Logo />
      <div className="dashboard--side-nav-link-container">
        <NavLink to="/dashboard" end>
          <HomeIcon />
          <p className="full">Home</p>
        </NavLink>
        <NavLink to="/dashboard/search">
          <SearchIcon />
          <p className="full">Search</p>
        </NavLink>
        <NavLink to="/dashboard/messages">
          <MessagesIcon />
          <p className="full">Messages</p>
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
          <p className="full">Create</p>
        </NavLink>
        <NavLink to="/dashboard/profile">
          <ProfilePicture />
          <p className="full">Profile</p>
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
