import styled from "styled-components";
import { useContext } from "react";

import pf from "../../../assets/imgs/default-pf.jpg";
import { DashboardContext } from "../../pages/dashboard/Dashboard";

const ProfilePictureWrapper = styled.div`
  display: grid;
  place-items: center;

  > img {
    border-radius: 100px;
  }
`;

const ProfilePicture = ({ width, height }) => {
  const { profilePictureUrl } = useContext(DashboardContext);

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
