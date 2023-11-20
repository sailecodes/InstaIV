import styled from "styled-components";

const LogoWrapper = styled.div`
  p {
    font-size: var(--font-md-1);
    font-weight: 600;
    font-style: italic;
  }

  .logo.large {
    font-size: var(--font-lg-1);
  }
`;

const Logo = ({ isLarge }) => {
  return (
    <LogoWrapper>
      <p className={`logo ${isLarge ? "large" : ""}`}>
        <span>Insta</span>IV
      </p>
    </LogoWrapper>
  );
};

export default Logo;
