import ProfileStat from "./ProfileStat";

const ProfileStats = ({ data }) => {
  return (
    <>
      <ProfileStat stat={data[0]} statOf={" posts"} />
      <ProfileStat stat={data[1]} statOf={" followers"} />
      <ProfileStat stat={data[2]} statOf={" following"} />
    </>
  );
};

export default ProfileStats;
