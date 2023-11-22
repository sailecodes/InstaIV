import styled from "styled-components";
import ProfileStat from "./ProfileStat";

const ProfileStatsWrapper = styled.section``;

const ProfileStats = ({ screenType, data, setIsFollowListVisible, setIsFollowingListClicked }) => {
  return (
    <ProfileStatsWrapper className={`profile--stats ${screenType}-screen`}>
      <ProfileStat
        stat={data[0]}
        statOf={" posts"}
        setIsFollowListVisible={setIsFollowListVisible}
      />
      <ProfileStat
        stat={data[1]}
        statOf={" followers"}
        isLink={true}
        setIsFollowListVisible={setIsFollowListVisible}
      />
      <ProfileStat
        stat={data[2]}
        statOf={" following"}
        isLink={true}
        setIsFollowListVisible={setIsFollowListVisible}
        setIsFollowingListClicked={setIsFollowingListClicked}
      />
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
