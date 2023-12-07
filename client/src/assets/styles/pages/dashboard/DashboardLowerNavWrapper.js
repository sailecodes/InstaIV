import styled from "styled-components";

const DashboardLowerNavWrapper = styled.nav`
  grid-row: 3;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 1px solid var(--color-border);

  .lower-nav--links-container {
    display: flex;
    align-items: center;
    gap: 6.5rem;
  }

  a {
    display: grid;
    place-items: center;

    transition: scale 0.2s;
  }

  a:hover {
    scale: 1.05;
  }

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  .active svg {
    fill: var(--color-blue);
  }

  a > img {
    width: 2.5rem;
    height: 2.5rem;
  }

  @media (min-width: 425px) {
    svg {
      width: 3.3rem;
      height: 3.3rem;
    }

    a > img {
      width: 3rem;
      height: 3rem;
    }

    .lower-nav--links-container {
      gap: 8rem;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default DashboardLowerNavWrapper;
