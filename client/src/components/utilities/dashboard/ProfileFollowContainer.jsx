import { useContext } from "react";
import { Link } from "react-router-dom";

import ProfilePicture from "./ProfilePicture";
import ProfileFollowContainerWrapper from "../../../assets/styles/pages/dashboard/ProfileFollowContainerWrapper";
import DeleteIcon from "../icons/DeleteIcon";
import { DashboardContext } from "../../pages/dashboard/Dashboard";

const ProfileFollowContainer = ({ followData }) => {
  const { isFollowContainerVisible, setIsFollowContainerVisible, isFollowingClicked, setIsFollowingClicked } =
    useContext(DashboardContext);

  const handleClick = () => {
    setIsFollowContainerVisible(false);
    setIsFollowingClicked(false);
  };

  return (
    <ProfileFollowContainerWrapper>
      <section className={`${isFollowContainerVisible ? "" : "display-none"}`}>
        <nav className="follow-container--nav">
          <p>{isFollowingClicked ? "Following" : "Followers"}</p>
          <button onClick={handleClick}>
            <DeleteIcon fill="var(--color-white)" />
          </button>
        </nav>
        <div className="follow-container--users">
          {followData.map((user) => {
            return (
              <div key={user._id}>
                <ProfilePicture userPfpUrl={user.contentUrl} />
                <p>{user.username}</p>
                <Link
                  to={`/dashboard/profile/${user.userId}`}
                  reloadDocument={true}
                  onClick={handleClick}>
                  See profile
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </ProfileFollowContainerWrapper>
  );
};
export default ProfileFollowContainer;
