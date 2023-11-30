import { useContext } from "react";
import { DashboardContext } from "../../pages/dashboard/Dashboard";
import { ProfileContext } from "../../pages/dashboard/Profile";

const ProfileStat = ({ stat, statOf, isLink }) => {
  const { setIsFollowContainerVisible, setIsFollowingClicked, setFollowData } = useContext(DashboardContext);
  const { data } = useContext(ProfileContext);

  return (
    <>
      {isLink && (
        <button
          onClick={() => {
            setIsFollowContainerVisible(true);
            setIsFollowingClicked(statOf.includes("following") ? true : false);
            setFollowData(statOf.includes("following") ? data.followingInfo : data.followersInfo);
          }}>
          {stat}
          <span>{statOf}</span>
        </button>
      )}
      {!isLink && (
        <p>
          {stat}
          <span>{statOf}</span>
        </p>
      )}
    </>
  );
};

export default ProfileStat;
