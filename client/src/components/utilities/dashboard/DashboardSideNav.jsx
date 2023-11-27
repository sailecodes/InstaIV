import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../general/Logo";
import HomeIcon from "../icons/HomeIcon";
import MessagesIcon from "../icons/MessagesIcon";
import CreateIcon from "../icons/CreateIcon";
import ProfilePicture from "./ProfilePicture";
import SearchIcon from "../icons/SearchIcon";
import { useContext } from "react";
import { AppContext } from "../../../App";

const DashboardSideNavWrapper = styled.nav`
  display: none;

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

  .side-nav--links-container {
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

  .display-none {
    display: none;
  }

  @media (min-width: 767px) {
    grid-column: 1 / 2;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5.5rem;

    height: 100vh;

    padding: 2rem 1rem;
    border-right: 1px solid var(--color-dark-gray);

    .logo {
      width: 3rem;
      height: 3rem;
    }

    .logo span {
      display: none;
    }

    > div:nth-child(1) {
      margin-left: 1rem;
    }

    .side-nav--links-container > a {
      width: 5.2rem;
    }

    .side-nav--link {
      display: none;
    }

    @media (min-width: 1264px) {
      .side-nav--links-container > a {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        width: 19.9rem;
      }

      .side-nav--links-container.width-maintain > a {
      }

      .side-nav--link {
        display: block;

        font-size: var(--font-sm-2);
      }

      .logo span {
        display: unset;
      }
    }
  }
`;

const DashboardSideNav = () => {
  const { userId } = useContext(AppContext);

  return (
    <DashboardSideNavWrapper>
      <Logo />
      <div className="side-nav--links-container">
        <NavLink
          to="/dashboard"
          end>
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
        <NavLink to={`/dashboard/profile/${userId}`}>
          <ProfilePicture
            width={"3rem"}
            height={"3rem"}
          />
          <p className="side-nav--link">Profile</p>
        </NavLink>
      </div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
