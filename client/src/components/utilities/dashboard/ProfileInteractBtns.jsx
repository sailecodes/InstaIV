import ProfileInteractBtnsWrapper from "../../../assets/styles/pages/dashboard/ProfileInteractBtnsWrapper";
import ProfileInteractBtn from "./ProfileInteractBtn";

const ProfileInteractBtns = ({ followUserMutation, unfollowUserMutation }) => {
  return (
    <ProfileInteractBtnsWrapper>
      <ProfileInteractBtn
        mutation={followUserMutation}
        text="Follow"
      />
      <ProfileInteractBtn
        mutation={unfollowUserMutation}
        text="Unfollow"
      />
    </ProfileInteractBtnsWrapper>
  );
};

export default ProfileInteractBtns;
