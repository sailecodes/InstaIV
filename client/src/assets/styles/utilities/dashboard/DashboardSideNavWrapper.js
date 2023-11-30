import styled from "styled-components";

const DashboardSideNavWrapper = styled.nav`
  display: none;

  a {
    color: var(--color-white);

    height: 5rem;

    text-decoration: none;

    padding: 1rem;
    border-radius: 8px;

    transition: background-color 0.2s;
  }

  a:hover {
    background-color: var(--color-darker-gray);
  }

  .side-nav--links-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    height: 100%;
  }

  .active svg {
    stroke: var(--color-white);
    fill: var(--color-white);
  }

  .active p {
    font-weight: 600;
  }

  @media (min-width: 767px) {
    grid-column: 1 / 2;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5.5rem;

    height: 100vh;

    padding: 2rem 1rem;
    border-right: 1px solid var(--color-dark-gray);

    .logo {
      width: 3rem;
      height: 3rem;
    }

    .logo span {
      display: none;
    }

    > div:nth-child(1) {
      margin-left: 1rem;
    }

    .side-nav--links-container > a {
      width: 5.2rem;
    }

    .side-nav--links-container > a:last-child {
      margin-top: auto;
    }

    .side-nav--link {
      display: none;
    }

    @media (min-width: 1264px) {
      .side-nav--links-container > a {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        width: 19.9rem;
      }

      .side-nav--link {
        display: block;

        font-size: var(--font-sm-2);
      }

      .logo span {
        display: unset;
      }
    }
  }
`;

export default DashboardSideNavWrapper;
