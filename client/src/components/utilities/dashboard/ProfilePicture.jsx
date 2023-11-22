import styled from "styled-components";
import pf from "../../../assets/imgs/default-pf.jpg";

const ProfilePictureWrapper = styled.div`
  display: grid;
  place-items: center;

  > img {
    border-radius: 100px;
  }
`;

const ProfilePicture = ({ width = "3rem", height = "3rem", url }) => {
  return (
    <ProfilePictureWrapper>
      <img
        src={url ? url : pf}
        alt="profile picture"
        style={{ width: width, height: height }}
      />
    </ProfilePictureWrapper>
  );
};
export default ProfilePicture;
