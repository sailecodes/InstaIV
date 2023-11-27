import styled from "styled-components";
import { useContext } from "react";

import pf from "../../../assets/imgs/default-pf.jpg";
import { AppContext } from "../../../App";

const ProfilePictureWrapper = styled.div`
  display: grid;
  place-items: center;

  > img {
    border-radius: 100px;
  }
`;

const ProfilePicture = ({ width, height }) => {
  const { userProfilePictureUrl } = useContext(AppContext);

  return (
    <ProfilePictureWrapper>
      <img
        src={userProfilePictureUrl ? userProfilePictureUrl : pf}
        alt="profile picture"
        style={{ width: width, height: height }}
      />
    </ProfilePictureWrapper>
  );
};
export default ProfilePicture;
