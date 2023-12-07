import styled from "styled-components";

const DashboardSideNavWrapper = styled.nav`
  display: none;

  @media (min-width: 768px) {
    grid-column: 1 / 2;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5.5rem;

    height: 100vh;

    padding: 2rem 1rem;
    border-right: 1px solid var(--color-border);

    > div:nth-child(1) {
      margin-left: 1rem;
    }

    .logo span {
      display: none;
    }

    .side-nav--links-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      height: 100%;
    }

    .side-nav--links-container a {
      color: var(--color-white);

      display: grid;
      place-items: center;

      height: 5.5rem;
      width: 5.2rem;

      text-decoration: none;

      padding: 1rem;
      border-radius: 8px;

      transition: background-color 0.2s;
    }

    .side-nav--links-container a:hover {
      background-color: var(--color-btn-hover);
    }

    .side-nav--links-container > a:last-child {
      margin-top: auto;
    }

    .side-nav--link-text {
      display: none;
    }

    .side-nav--links-container svg,
    .side-nav--links-container img {
      width: 3.3rem;
      height: 3.3rem;
    }

    .active svg {
      fill: var(--color-blue);
    }

    .active p {
      color: var(--color-blue);

      font-weight: 600;
    }

    @media (min-width: 1264px) {
      .side-nav--links-container > a {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        width: 19.9rem;
      }

      .side-nav--link-text {
        display: block;

        font-size: var(--font-sm-4);
      }

      .logo span {
        display: unset;
      }
    }
  }
`;

export default DashboardSideNavWrapper;
