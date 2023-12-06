import pf from "../../../assets/imgs/default-pf.jpg";

const ProfilePicture = ({ width, height, userPfpUrl }) => {
  return (
    <img
      src={userPfpUrl ? userPfpUrl : pf}
      alt="profile picture"
      style={{ width: width, height: height, borderRadius: "50%", objectFit: "cover" }}
    />
  );
};
export default ProfilePicture;
