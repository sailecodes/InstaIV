import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

import DashboardTopNav from "../../utilities/dashboard/DashboardTopNav";
import DashboardLowerNav from "../../utilities/dashboard/DashboardLowerNav";
import DashboardSideNav from "../../utilities/dashboard/DashboardSideNav";
import ProfileFollowContainer from "../../utilities/dashboard/ProfileFollowContainer";

const DashboardWrapper = styled.div`
  background-color: var(--color-bg);
  color: var(--color-font-white);

  display: grid;
  grid-template-rows: 6rem 1fr 5rem;

  height: 100vh;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 7.3rem 1fr;
  }

  @media (min-width: 1264px) {
    grid-template-columns: 22rem 1fr;
  }
`;

const Dashboard = () => {
  const [isFollowContainerVisible, setIsFollowContainerVisible] = useState(false);
  const [isFollowingClicked, setIsFollowingClicked] = useState(false);
  const [followData, setFollowData] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        isFollowContainerVisible,
        setIsFollowContainerVisible,
        isFollowingClicked,
        setIsFollowingClicked,
        setFollowData,
      }}>
      {isFollowContainerVisible && <ProfileFollowContainer followData={followData} />}
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
