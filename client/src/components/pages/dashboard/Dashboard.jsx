import styled from "styled-components";
import { Outlet } from "react-router-dom";

import ProfileFull from "../../utilities/dashboard/ProfileFull";
import DashboardTopNav from "../../utilities/dashboard/DashboardTopNav";
import DashboardLowerNav from "../../utilities/dashboard/DashboardLowerNav";
import DashboardSideNav from "../../utilities/dashboard/DashboardSideNav";

const DashboardWrapper = styled.div`
  .dashboard--container {
    background-color: var(--color-black);
    color: var(--color-white);

    display: grid;
    grid-template-rows: 6rem 1fr 5rem;

    height: 100vh;
  }

  .dashboard--profile-full {
    display: none;
  }

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
    .dashboard--container {
      display: grid;
      grid-template-columns: 7.3rem 1fr 18rem;
      grid-template-rows: 6rem 1fr;
    }

    .dashboard--profile-full {
      grid-column: 3;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;

      padding: 2rem 2rem 0 0;
    }

    .dashboard--top-nav {
      display: none;
    }

    .dashboard--side-nav {
      grid-column: 1 / 2;
      grid-row: 1 / -1;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5.5rem;

      height: 100vh;

      padding: 2rem 2rem 2rem 2rem;
      border-right: 1px solid var(--color-dark-gray);
    }

    .logo {
      width: 3rem;
      height: 3rem;

      text-align: center;
    }

    .logo span {
      display: none;
    }

    .dashboard--side-nav .full {
      display: none;
    }

    .dashboard--lower-nav {
      display: none;
    }
  }

  @media (min-width: 1264px) {
    .dashboard--container {
      grid-template-columns: 22rem 1fr 18rem;
    }

    .logo span {
      display: unset;
    }

    .dashboard--side-nav a {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .dashboard--side-nav .full {
      display: unset;
    }
  }
`;

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <main className="dashboard--container">
        <ProfileFull />
        <DashboardTopNav />
        <DashboardSideNav />
        <DashboardLowerNav />
        <Outlet />
      </main>
    </DashboardWrapper>
  );
};

export default Dashboard;
