import pf from "../../../assets/imgs/default-pf.jpg";

const ProfilePicture = ({ userPfpUrl }) => {
  return (
    <img
      src={userPfpUrl ? userPfpUrl : pf}
      alt="profile picture"
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  );
};
export default ProfilePicture;
