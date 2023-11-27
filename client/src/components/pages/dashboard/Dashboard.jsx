import styled from "styled-components";
import { Outlet } from "react-router-dom";

import DashboardTopNav from "../../utilities/dashboard/DashboardTopNav";
import DashboardLowerNav from "../../utilities/dashboard/DashboardLowerNav";
import DashboardSideNav from "../../utilities/dashboard/DashboardSideNav";

const DashboardWrapper = styled.div`
  background-color: var(--color-black);
  color: var(--color-white);

  display: grid;
  grid-template-rows: 6rem 1fr 5rem;

  height: 100vh;

  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 7.3rem 1fr;
  }

  @media (min-width: 1264px) {
    grid-template-columns: 22rem 1fr;
  }
`;

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardTopNav />
      <DashboardSideNav />
      <DashboardLowerNav />
      <Outlet />
    </DashboardWrapper>
  );
};

export default Dashboard;
