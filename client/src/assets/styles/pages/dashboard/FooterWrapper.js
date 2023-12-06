import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: none;

  @media (min-width: 940px) {
    display: unset;

    width: 25rem;

    margin-left: 7rem;

    > p {
      color: var(--color-font-gray);

      font-size: var(--font-sm-1);
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    > div div {
      color: var(--color-font-blue);
    }

    a {
      color: var(--color-font-blue);

      font-size: var(--font-sm-1);
    }
  }
`;

export default FooterWrapper;
