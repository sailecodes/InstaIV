import styled from "styled-components";
import ProfilePicture from "./ProfilePicture";

const ProfileFullWrapper = styled.div`
  p {
    font-size: var(--font-sm-1);
  }

  p:nth-child(2) {
    color: var(--color-gray);
  }

  .dashboard--profile-full-name-container {
    display: flex;
    flex-direction: column;
  }
`;

const ProfileFull = ({ screenSize }) => {
  return (
    <ProfileFullWrapper className="dashboard--profile-full">
      <ProfilePicture
        width={"4rem"}
        height={"4rem"}
      />
      <div className="dashboard--profile-full-name-container">
        <p>elias.iv</p>
        <p>elias</p>
      </div>
    </ProfileFullWrapper>
  );
};

export default ProfileFull;
