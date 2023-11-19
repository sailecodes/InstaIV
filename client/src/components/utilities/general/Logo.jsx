import styled from "styled-components";

const LogoWrapper = styled.div`
  p {
    font-size: var(--font-md-1);
    font-weight: 600;
    font-style: italic;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <p className="logo">
        <span>Insta</span>IV
      </p>
    </LogoWrapper>
  );
};

export default Logo;
