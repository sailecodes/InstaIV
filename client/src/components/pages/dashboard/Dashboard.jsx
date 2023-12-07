import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

import DashboardWrapper from "../../../assets/styles/pages/dashboard/DashboardWrapper";
import DashboardTopNav from "../../utilities/dashboard/DashboardTopNav";
import DashboardLowerNav from "../../utilities/dashboard/DashboardLowerNav";
import DashboardSideNav from "../../utilities/dashboard/DashboardSideNav";
import ProfileFollowContainer from "../../utilities/dashboard/ProfileFollowContainer";

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
