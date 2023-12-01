import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: none;

  @media (min-width: 767px) {
    display: unset;

    width: 30rem;

    margin-left: 7rem;

    > p {
      color: var(--color-gray);

      font-size: var(--font-sm-0);
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    > div div {
      color: var(--color-blue);
    }

    a {
      color: var(--color-blue);

      font-size: var(--font-sm-0);
    }
  }
`;

export default FooterWrapper;
