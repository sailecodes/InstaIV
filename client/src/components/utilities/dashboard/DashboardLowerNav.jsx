import styled from "styled-components";
import { NavLink } from "react-router-dom";

import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import HomeIcon from "../icons/HomeIcon";
import CreateIcon from "../icons/CreateIcon";
import MessagesIcon from "../icons/MessagesIcon";

const DashboardLowerNavWrapper = styled.nav`
  .dashboard--lower-nav-link-container {
    display: flex;
    align-items: center;
    gap: 8rem;

    margin: 0 auto;
  }

  a {
    transition: scale 0.2s;
  }

  .dashboard--lower-nav-link-container > a:hover {
    scale: 1.05;
  }

  .active svg {
    stroke: none;
    fill: var(--color-white);
  }
`;

const DashboardLowerNav = () => {
  return (
    <DashboardLowerNavWrapper className="dashboard--lower-nav">
      <div className="dashboard--lower-nav-link-container">
        <NavLink to="/dashboard" end>
          <HomeIcon />
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
        </NavLink>
        <NavLink to="/dashboard/messages">
          <MessagesIcon />
        </NavLink>
        <NavLink to="/dashboard/profile">
          <ProfilePicture width="2.6rem" height="2.6rem" />
        </NavLink>
      </div>
    </DashboardLowerNavWrapper>
  );
};

export default DashboardLowerNav;
