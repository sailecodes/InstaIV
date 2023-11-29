import pf from "../../../assets/imgs/default-pf.jpg";

const ProfilePicture = ({ width, height, profilePictureUrl }) => {
  return (
    <img
      src={profilePictureUrl ? profilePictureUrl : pf}
      alt="profile picture"
      style={{ width: width, height: height, borderRadius: "50%" }}
    />
  );
};
export default ProfilePicture;
