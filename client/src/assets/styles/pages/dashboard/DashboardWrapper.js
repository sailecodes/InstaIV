import styled from "styled-components";

const DashboardWrapper = styled.div`
  background-color: var(--color-black);
  color: var(--color-white);

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

export default DashboardWrapper;
