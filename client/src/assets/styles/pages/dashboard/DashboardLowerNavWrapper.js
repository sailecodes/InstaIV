import styled from "styled-components";

const DashboardLowerNavWrapper = styled.nav`
  grid-row: 3;

  display: flex;
  align-items: center;

  padding: 2rem;
  border-top: 1px solid var(--color-dark-gray);

  .lower-nav--links-container {
    display: flex;
    align-items: center;
    gap: 8rem;

    margin: 0 auto;
  }

  a {
    transition: scale 0.2s;
  }

  .lower-nav--links-container > a:hover {
    scale: 1.05;
  }

  .lower-nav--links-container .active svg {
    fill: var(--color-blue);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default DashboardLowerNavWrapper;
