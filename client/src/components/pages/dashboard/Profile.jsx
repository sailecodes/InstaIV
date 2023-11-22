import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { useQuery } from "@tanstack/react-query";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";

import axiosFetch from "../../../utilities/axiosFetch";
import useScreenSize from "../../../custom-hooks/useScreenSize";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import ProfileContentIcon from "../../utilities/icons/ProfileContentIcon";
import SavedIcon from "../../utilities/icons/SavedIcon";
import ProfileStats from "../../utilities/dashboard/ProfileStats";
import Error from "../../utilities/general/Error";
import Exit from "../../utilities/icons/Exit";

const ProfileWrapper = styled.div`
  overflow-y: scroll;

  > div {
    position: relative;

    max-width: 99rem;
  }

  .profile--perr-container {
    position: relative;
    bottom: 5%;

    display: grid;
    place-items: center;

    height: 100%;
    width: 100%;
  }

  .profile--follow-container {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    background-color: var(--color-dark-gray);

    width: 30rem;
    height: 40rem;

    border-radius: 8px;
  }

  .profile--user-information {
    display: grid;
    grid-template-columns: 7.7rem 1fr;
    grid-template-rows: 7.8rem 1fr;
    column-gap: 2rem;
    row-gap: 1.5rem;

    padding: 2rem;
    border-bottom: 1px solid var(--color-darker-gray);
  }

  .profile--user-information > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  .profile--username {
    font-size: var(--font-sm-3);
  }

  .profile--edit-btn {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    width: 11.5rem;
    height: 3.2rem;

    font-family: inherit;
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  .profile--edit-btn:hover {
    cursor: pointer;
  }

  .profile--stats.mid-screen {
    display: none;
  }

  .profile--bio {
    grid-column: 1 / -1;

    font-size: var(--font-sm-1);

    max-width: 44.5rem;
  }

  .profile--stats.small-screen {
    display: flex;
    align-items: center;
    justify-content: space-around;

    height: 6rem;

    border-bottom: 1px solid var(--color-darker-gray);
  }

  .profile--stats.small-screen > button {
    color: var(--color-white);
  }

  .profile--stats.small-screen > p,
  .profile--stats.small-screen > button {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 5.9rem;

    font-size: var(--font-sm-1);
    font-family: inherit;
  }

  .profile--stats.small-screen > p span,
  .profile--stats.small-screen > button span {
    color: var(--color-gray);
  }

  .profile--user-content > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    padding: 0.8rem 0 0.8rem 0;
  }

  .profile--user-content .active svg {
    stroke: var(--color-blue);
    fill: var(--color-blue);
  }

  .profile--content-container {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .profile--content-row-container {
    align-items: stretch;

    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    gap: 0.4rem;
  }

  .profile--content-row-container > div {
    flex: 1 0 0%;

    width: 27vw;
    height: 31.8vw;
    max-width: 32.73rem;
    max-height: 32.73rem;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  @media (min-width: 767px) {
    > div {
      margin: 0 auto;
    }

    .profile--user-information {
      grid-template-columns: 15rem 1fr;
      grid-template-rows: 7.8rem 6rem 5rem;
      column-gap: 2rem;
      row-gap: 1.5rem;

      padding: 0 2rem 2rem 2rem;
    }

    .profile--user-information > div:nth-child(1) {
      grid-row: 1 / -1;

      position: relative;
      bottom: 5%;
    }

    .profile--user-information > div:nth-child(2) {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
    }

    .profile--stats.mid-screen {
      display: flex;
      align-items: flex-start;
      gap: 3rem;

      position: relative;
      bottom: 20%;

      font-size: var(--font-sm-1);
    }

    .profile--stats.mid-screen > button {
      color: var(--color-white);

      height: 2.1rem;

      font-size: var(--font-sm-1);
    }

    .profile--bio {
      grid-column: 2 / -1;

      position: relative;
      bottom: 60%;

      height: 7.2rem;
    }

    .profile--stats.small-screen {
      display: none;
    }
  }
`;

/*
  TODO:
    - bio should be 350 max
*/

const Profile = () => {
  const [isFollowListVisible, setIsFollowListVisible] = useState(false);
  const [isFollowingListClicked, setIsFollowingListClicked] = useState(false);
  const screenSize = useScreenSize();

  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosFetch.get("/users/user");
      return data;
    },
  });

  return (
    <ProfileWrapper className="dashboard--outlet">
      {isError && (
        <div className="profile--perr-container">
          <Error />
        </div>
      )}
      {isPending && (
        <div className="profile--perr-container">
          <PulseLoader
            color="var(--color-blue)"
            cssOverride={{ transform: "rotate(-90deg)" }}
          />
        </div>
      )}
      {!isError && !isPending && (
        <>
          <div>
            <FollowContainer
              listName={isFollowingListClicked ? "Following" : "Followers"}
              data={[{ username: "IU" }, { username: "yujin" }, { username: "chaewon" }, { username: "kanye west" }]}
              isFollowListVisible={isFollowListVisible}
              setIsFollowListVisible={setIsFollowListVisible}
              setIsFollowingListClicked={setIsFollowingListClicked}
            />
            <section className="profile--user-information">
              <ProfilePicture
                width={screenSize.width >= 767 ? "15rem" : "7.7rem"}
                height={screenSize.width >= 767 ? "15rem" : "7.7rem"}
                url={data.profilePicture[0]}
              />
              <div>
                <p className="profile--username">{data.username}</p>
                <button className="profile--edit-btn">Edit profile</button>
              </div>
              <ProfileStats
                screenType={"mid"}
                data={[data.numPosts, data.followers.length, data.following.length]}
                setIsFollowListVisible={setIsFollowListVisible}
                setIsFollowingListClicked={setIsFollowingListClicked}
              />
              <p className="profile--bio">{!data.bio ? "No bio yet. Write something!" : data.bio}</p>
            </section>
            <ProfileStats
              screenType={"small"}
              data={[data.numPosts, data.followers.length, data.following.length]}
              setIsFollowListVisible={setIsFollowListVisible}
              setIsFollowingListClicked={setIsFollowingListClicked}
            />
            <section className="profile--user-content">
              <nav>
                <NavLink
                  to="/dashboard/profile"
                  end>
                  <ProfileContentIcon />
                </NavLink>
                <NavLink to="/dashboard/profile/saved-posts">
                  <SavedIcon />
                </NavLink>
              </nav>
              <div className="profile--content-container">
                <div className="profile--content-row-container">
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-1.jpeg')" }}></div>
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-3.jpeg')" }}></div>
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-4.jpg')" }}></div>
                </div>
                <div className="profile--content-row-container">
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-2.png')" }}></div>
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-4.jpg')" }}></div>
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-3.jpeg')" }}></div>
                </div>
                <div className="profile--content-row-container">
                  <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-4.jpg')" }}></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </ProfileWrapper>
  );
};

const FollowContainerWrapper = styled.section`
  display: flex;
  flex-direction: column;

  nav {
    position: relative;

    display: grid;
    place-items: center;

    padding: 1rem;
    border-bottom: 1px solid var(--color-darker-gray);
  }

  nav p {
    font-size: var(--font-sm-2);
    font-weight: 600;
  }

  nav button {
    position: absolute;
    right: 2%;

    display: grid;
    place-items: center;
  }

  .item-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    padding: 2rem;

    overflow-y: scroll;
  }

  .item-container > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .item-container > div p {
    font-size: var(--font-sm-1);
  }

  .item-container > div a {
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

  .item-container::-webkit-scrollbar-track {
    background-color: var(--color-dark-gray);

    border-radius: 0 0 8px 0;
  }

  .item-container::-webkit-scrollbar-thumb {
    background: var(--color-darker-gray);

    border-radius: 0 0 8px 0;
  }
`;

const FollowContainer = ({
  listName,
  data,
  isFollowListVisible,
  setIsFollowListVisible,
  setIsFollowingListClicked,
}) => {
  return (
    <FollowContainerWrapper className={`profile--follow-container ${isFollowListVisible ? "" : "display-none"}`}>
      <nav>
        <p>{listName}</p>
        <button
          onClick={() => {
            setIsFollowListVisible(false);
            setIsFollowingListClicked(false);
          }}>
          <Exit />
        </button>
      </nav>
      <div className="item-container">
        {data.map((item) => (
          <div key={item._id}>
            <ProfilePicture />
            <p>{item.username}</p>
            <Link>See profile</Link>
          </div>
        ))}
      </div>
    </FollowContainerWrapper>
  );
};

export default Profile;
