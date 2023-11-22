const ProfileStat = ({ stat, statOf, isLink, setIsFollowListVisible, setIsFollowingListClicked }) => {
  return (
    <>
      {isLink && (
        <button
          onClick={() => {
            setIsFollowListVisible(true);
            setIsFollowingListClicked(true);
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
