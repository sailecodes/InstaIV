import styled from "styled-components";

const LogoWrapper = styled.div`
  p {
    font-size: var(--font-md-1);
    font-weight: 600;
    font-style: italic;
  }
`;

const Logo = ({full}) => {
  return (
    <LogoWrapper>
      <p>{full ? "InstaIV" : "IV"}</p>
    </LogoWrapper>
  );
};

export default Logo;
