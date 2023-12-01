import LogoWrapper from "../../../assets/styles/general/LogoWrapper";

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
