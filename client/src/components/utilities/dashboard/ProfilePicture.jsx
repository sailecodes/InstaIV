import styled from "styled-components";
import pf from "../../../assets/imgs/default-pf.jpg";

const ProfilePictureWrapper = styled.div`
  display: grid;
  place-items: center;

  > img {
    border-radius: 100px;
  }
`;

const ProfilePicture = ({ width, height, profilePictureUrl }) => {
  return (
    <ProfilePictureWrapper>
      <img
        src={profilePictureUrl ? profilePictureUrl : pf}
        alt="profile picture"
        style={{ width: width, height: height }}
      />
    </ProfilePictureWrapper>
  );
};
export default ProfilePicture;
