import styled from "styled-components";
import Logo from "../general/Logo";

const DashboardSideNavWrapper = styled.nav`
  p {
    font-size: var(--font-md-1);
  }

  .dashboard--side-nav-logo-container {
    display: flex;
    flex-direction: column;
  }
`;

const DashboardSideNav = () => {
  return (
    <DashboardSideNavWrapper className="dashboard--side-nav">
      <Logo full={false} />
      <div className="dashboard--side-nav-logo-container"></div>
    </DashboardSideNavWrapper>
  );
};

export default DashboardSideNav;
