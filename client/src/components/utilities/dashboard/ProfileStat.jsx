const ProfileStat = ({ stat, statOf }) => {
  return (
    <p>
      {stat}
      <span>{statOf}</span>
    </p>
  );
};

export default ProfileStat;
