import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import MessagesIcon from "../icons/MessagesIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";

const DashboardSideNavWrapper = styled.nav`
  .dashboard--side-nav-link-container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .active svg {
    stroke: none;
    fill: var(--color-white);
  }
`;

const DashboardSideNav = () => {
  return (
    <DashboardSideNavWrapper className="dashboard--side-nav">
      <Logo full={false} />
      <div className="dashboard--side-nav-link-container">
        <NavLink
          to="/dashboard"
          end>
          <HomeIcon />
        </NavLink>
        <NavLink to="/dashboard/search">
          <SearchIcon />
        </NavLink>
        <NavLink to="/dashboard/messages">
          <MessagesIcon />
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
        </NavLink>
        <NavLink to="/dashboard/profile">
          <ProfilePicture
            width="3rem"
            height="3rem"
          />
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
