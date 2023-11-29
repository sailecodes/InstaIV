import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { createContext, useContext, useState } from "react";

import DashboardTopNav from "../../utilities/dashboard/DashboardTopNav";
import DashboardLowerNav from "../../utilities/dashboard/DashboardLowerNav";
import DashboardSideNav from "../../utilities/dashboard/DashboardSideNav";
import Exit from "../../utilities/icons/Exit";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import { ProfileContext } from "./Profile";

const DashboardWrapper = styled.div`
  background-color: var(--color-black);
  color: var(--color-white);

  display: grid;
  grid-template-rows: 6rem 1fr 5rem;

  height: 100vh;

  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 7.3rem 1fr;
  }

  @media (min-width: 1264px) {
    grid-template-columns: 22rem 1fr;
  }
`;

const FollowContainerWrapper = styled.div`
  background-color: var(--color-shaded-bg);

  position: absolute;
  z-index: 100;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100%;

  padding: 8rem;

  overflow: hidden;

  > section {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;

    width: 30rem;
    height: 40rem;

    border-radius: 8px;
  }

  .follow-container--nav {
    position: relative;

    display: grid;
    place-items: center;

    padding: 1rem;
    border-bottom: 1px solid var(--color-darker-gray);
  }

  .follow-container--nav > p {
    font-size: var(--font-sm-2);
    font-weight: 600;
  }

  .follow-container--nav > button {
    position: absolute;
    right: 2%;

    display: grid;
    place-items: center;
  }

  .follow-container--users {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    padding: 2rem;

    overflow-y: scroll;
  }

  .follow-container--users > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .follow-container--users > div p {
    font-size: var(--font-sm-1);
  }

  .follow-container--users > div a {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 9rem;
    height: 3rem;

    font-size: var(--font-sm-1);

    margin-left: auto;
    border-radius: 5px;
  }

  .follow-container--users::-webkit-scrollbar-track {
    background-color: var(--color-darker-gray);

    border-radius: 0 0 8px 0;
  }

  .follow-container--users::-webkit-scrollbar-thumb {
    background: var(--color-dark-gray);

    border-radius: 0 0 8px 0;
  }

  @media (min-width: 767px) {
    > section {
      width: 40rem;
      height: 40rem;
    }
  }
`;

const Dashboard = () => {
  const [isFollowContainerVisible, setIsFollowContainerVisible] = useState(false);
  const [isFollowingClicked, setIsFollowingClicked] = useState(false);
  const [followData, setFollowData] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        isFollowContainerVisible,
        setIsFollowContainerVisible,
        isFollowingClicked,
        setIsFollowingClicked,
        setFollowData,
      }}>
      {isFollowContainerVisible && <FollowContainer followData={followData} />}
      <DashboardWrapper>
        <DashboardTopNav />
        <DashboardSideNav />
        <DashboardLowerNav />
        <Outlet />
      </DashboardWrapper>
    </DashboardContext.Provider>
  );
};

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

export const DashboardContext = createContext();

export default Dashboard;
