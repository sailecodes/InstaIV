import styled from "styled-components";

const DashboardTopNavWrapper = styled.nav`
  grid-row: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-bg);
  color: var(--color-font-white);

  padding: 2rem;
  border-bottom: 1px solid var(--color-border);

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  @media (min-width: 425px) {
    svg {
      width: 3.3rem;
      height: 3.3rem;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default DashboardTopNavWrapper;
