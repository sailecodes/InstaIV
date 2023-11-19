import styled from "styled-components";

import Logo from "../general/Logo";
import SearchBar from "../general/SearchBar";

const DashboardTopNavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-black);
  color: var(--color-white);

  padding: 2rem;
  border-bottom: 1px solid var(--color-dark-gray);
`;

const DashboardTopNav = () => {
  return (
    <DashboardTopNavWrapper className="dashboard--top-nav">
      <Logo />
      <SearchBar />
    </DashboardTopNavWrapper>
  );
};

export default DashboardTopNav;
