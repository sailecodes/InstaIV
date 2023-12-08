import ProfileInteractBtnsWrapper from "../../../assets/styles/pages/dashboard/ProfileInteractBtnsWrapper";
import ProfileInteractBtn from "./ProfileInteractBtn";

const ProfileInteractBtns = ({ followersInfo, followUserMutation, unfollowUserMutation }) => {
  const userId = localStorage.getItem("userId");
  const isFollowed = followersInfo.find((follower) => follower.userId === userId);

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
