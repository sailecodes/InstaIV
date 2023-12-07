import pfp from "../../../assets/imgs/default-pf.jpg";

const ProfilePicture = ({ userPfpUrl }) => {
  return (
    <img
      src={userPfpUrl ? userPfpUrl : pfp}
      alt="profile picture"
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  );
};
export default ProfilePicture;
