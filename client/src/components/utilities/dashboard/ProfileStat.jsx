import { useContext } from "react";
import { ProfileContext } from "../../pages/dashboard/Profile";

const ProfileStat = ({ stat, statOf, isLink }) => {
  const { setIsFollowContainerVisible, setIsFollowingClicked } = useContext(ProfileContext);

  return (
    <>
      {isLink && (
        <button
          onClick={() => {
            setIsFollowContainerVisible(true);
            setIsFollowingClicked(true);
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
