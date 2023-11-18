import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import { CiChat2 } from "react-icons/ci";

import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import Home from "../icons/Home";

const DashboardLowerNavWrapper = styled.nav`
  .dashboard--lower-nav-icon-container {
    display: flex;
    align-items: center;
    gap: 8rem;

    margin: 0 auto;
  }
`;

const iconStyles = { width: "3rem", height: "3rem" };

const DashboardLowerNav = () => {
  return (
    <DashboardLowerNavWrapper className="dashboard--lower-nav">
      <div className="dashboard--lower-nav-icon-container">
        <Home />
        <CiSquarePlus style={iconStyles} />
        <CiChat2 style={iconStyles} />
        <ProfilePicture
          width="3rem"
          height="3rem"
        />
      </div>
    </DashboardLowerNavWrapper>
  );
};

export default DashboardLowerNav;
