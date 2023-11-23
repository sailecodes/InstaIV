const ProfileStat = ({ stat, statOf, isLink, setIsFollowContainerVisible, setIsFollowingClicked }) => {
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
