import { useContext } from "react";

import ProfileInteractBtnsWrapper from "../../../assets/styles/pages/dashboard/ProfileInteractBtnsWrapper";
import ProfileInteractBtn from "./ProfileInteractBtn";
import { ProfileContext } from "../../pages/dashboard/Profile";

const ProfileInteractBtns = () => {
  const { data, followUserMutation, unfollowUserMutation } = useContext(ProfileContext);

  const userId = localStorage.getItem("userId");
  const isFollowed = data.followersInfo.find((follower) => follower.userId === userId);

  return (
    <ProfileInteractBtnsWrapper>
      {isFollowed && (
        <ProfileInteractBtn
          mutation={unfollowUserMutation}
          text="Unfollow"
        />
      )}
      {!isFollowed && (
        <ProfileInteractBtn
          mutation={followUserMutation}
          text="Follow"
        />
      )}
    </ProfileInteractBtnsWrapper>
  );
};

export default ProfileInteractBtns;
