import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

import DashboardTopNav from "../../utilities/dashboard/DashboardTopNav";
import DashboardLowerNav from "../../utilities/dashboard/DashboardLowerNav";
import DashboardSideNav from "../../utilities/dashboard/DashboardSideNav";

const DashboardWrapper = styled.div`
  background-color: var(--color-black);
  color: var(--color-white);

  display: grid;
  grid-template-rows: 6rem 1fr 5rem;

  height: 100vh;

  .dashboard--top-nav {
    grid-row: 1;
  }

  .dashboard--side-nav {
    display: none;
  }

  .dashboard--lower-nav {
    grid-row: 3;

    display: flex;
    align-items: center;

    padding: 2rem;
    border-top: 1px solid var(--color-dark-gray);
  }

  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 7.3rem 1fr;

    .dashboard--top-nav {
      display: none;
    }

    .dashboard--side-nav {
      grid-column: 1 / 2;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5.5rem;

      height: 100vh;

      padding: 2rem 1rem;
      border-right: 1px solid var(--color-dark-gray);
    }

    .dashboard--side-nav a {
      width: 5.2rem;
    }

    .dashboard--side-nav > div:nth-child(1) {
      margin-left: 1rem;
    }

    .dashboard--side-nav .dashboard-link.full-screen {
      display: none;
    }

    .dashboard--lower-nav {
      display: none;
    }

    .logo {
      width: 3rem;
      height: 3rem;

      text-align: center;
    }

    .logo span {
      display: none;
    }
  }

  @media (min-width: 1264px) {
    grid-template-columns: 22rem 1fr;

    .dashboard--side-nav a {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      width: 19.9rem;
    }

    .dashboard--side-nav .dashboard-link.full-screen {
      display: unset;
    }

    .logo span {
      display: unset;
    }
  }
`;

const Dashboard = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  return (
    <DashboardContext.Provider value={{ profilePictureUrl, setProfilePictureUrl }}>
      <DashboardWrapper>
        <DashboardTopNav />
        <DashboardSideNav />
        <DashboardLowerNav />
        <Outlet />
      </DashboardWrapper>
    </DashboardContext.Provider>
  );
};

export const DashboardContext = createContext();

export default Dashboard;
