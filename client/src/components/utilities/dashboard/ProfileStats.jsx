import { useContext } from "react";

import ProfileStat from "./ProfileStat";
import ProfileStatsWrapper from "../../../assets/styles/pages/dashboard/ProfileStatsWrapper";
import { ProfileContext } from "../../pages/dashboard/Profile";

const ProfileStats = () => {
  const { data } = useContext(ProfileContext);

  return (
    <ProfileStatsWrapper>
      <section>
        <ProfileStat
          stat={data.numPosts}
          statOf={" posts"}
        />
        <ProfileStat
          stat={data.followersInfo.length}
          statOf={" followers"}
          isLink={true}
        />
        <ProfileStat
          stat={data.followingInfo.length}
          statOf={" following"}
          isLink={true}
        />
      </section>
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
