import styled from "styled-components";

const LogoWrapper = styled.div`
  p {
    color: var(--color-white);

    font-size: var(--font-md-3);
    font-weight: 600;
    font-style: italic;
  }

  .logo.auth {
    font-size: var(--font-subheading-2);
  }

  @media (min-width: 425px) {
    p {
      font-size: var(--font-lg-1);
    }

    .logo.auth {
      font-size: var(--font-heading-1);
    }
  }
`;

export default LogoWrapper;
