import styled from "styled-components";
import { NavLink } from "react-router-dom";

import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import HomeIcon from "../icons/HomeIcon";
import CreateIcon from "../icons/CreateIcon";
import MessagesIcon from "../icons/MessagesIcon";
import { useContext } from "react";
import { AppContext } from "../../../App";

const DashboardLowerNavWrapper = styled.nav`
  grid-row: 3;

  display: flex;
  align-items: center;

  padding: 2rem;
  border-top: 1px solid var(--color-dark-gray);

  .lower-nav--links-container {
    display: flex;
    align-items: center;
    gap: 8rem;

    margin: 0 auto;
  }

  a {
    transition: scale 0.2s;
  }

  .lower-nav--links-container > a:hover {
    scale: 1.05;
  }

  .lower-nav--links-container .active svg {
    stroke: var(--color-white);
    fill: var(--color-white);
  }

  @media (min-width: 767px) {
    display: none;
  }
`;

const DashboardLowerNav = () => {
  const { userId } = useContext(AppContext);

  return (
    <DashboardLowerNavWrapper>
      <div className="lower-nav--links-container">
        <NavLink
          to="/dashboard"
          end>
          <HomeIcon />
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon />
        </NavLink>
        <NavLink to="/dashboard/messages">
          <MessagesIcon />
        </NavLink>
        <NavLink to={`/dashboard/profile/${userId}`}>
          <ProfilePicture
            width="2.6rem"
            height="2.6rem"
          />
        </NavLink>
      </div>
    </DashboardLowerNavWrapper>
  );
};

export default DashboardLowerNav;
