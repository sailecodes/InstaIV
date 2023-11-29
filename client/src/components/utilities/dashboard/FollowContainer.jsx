import { useContext } from "react";
import { Link } from "react-router-dom";

import ProfilePicture from "./ProfilePicture";
import Exit from "../icons/Exit";
import FollowContainerWrapper from "../../../assets/styles/utilities/dashboard/FollowContainerWrapper";
import { DashboardContext } from "../../pages/dashboard/Dashboard";

const FollowContainer = ({ followData }) => {
  const { isFollowContainerVisible, setIsFollowContainerVisible, isFollowingClicked, setIsFollowingClicked } =
    useContext(DashboardContext);

  const handleClick = () => {
    setIsFollowContainerVisible(false);
    setIsFollowingClicked(false);
  };

  return (
    <FollowContainerWrapper>
      <section className={`${isFollowContainerVisible ? "" : "display-none"}`}>
        <nav className="follow-container--nav">
          <p>{isFollowingClicked ? "Following" : "Followers"}</p>
          <button onClick={handleClick}>
            <Exit width={"2.5rem"} height={"2.5rem"} />
          </button>
        </nav>
        <div className="follow-container--users">
          {followData.map((user) => (
            <div key={user._id}>
              <ProfilePicture width="3rem" height="3rem" />
              <p>{user.username}</p>
              <Link to={`/dashboard/profile/${user.userId}`} reloadDocument={true} onClick={handleClick}>
                See profile
              </Link>
            </div>
          ))}
        </div>
      </section>
    </FollowContainerWrapper>
  );
};
export default FollowContainer;
