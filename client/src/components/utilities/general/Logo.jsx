import LogoWrapper from "../../../assets/styles/general/LogoWrapper";

const Logo = ({ isInAuthPage }) => {
  return (
    <LogoWrapper>
      <p className={`logo ${isInAuthPage ? "auth" : ""}`}>
        <span>Insta</span>IV
      </p>
    </LogoWrapper>
  );
};

export default Logo;
