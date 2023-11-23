import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { useQuery } from "@tanstack/react-query";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";

import axiosFetch from "../../../utilities/axiosFetch";
import useScreenSize from "../../../custom-hooks/useScreenSize";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import UserPostsIcon from "../../utilities/icons/UserPostsIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import ProfileStats from "../../utilities/dashboard/ProfileStats";
import Error from "../../utilities/general/Error";
import Exit from "../../utilities/icons/Exit";

const ProfileWrapper = styled.div`
  position: relative;

  padding: 2rem 0 0 0;

  overflow-y: scroll;

  > div {
    max-width: 99rem;
  }

  .profile--user-information {
    display: grid;
    grid-template-columns: 7.7rem 1fr;
    grid-template-rows: 7.8rem 1fr;
    column-gap: 2rem;
    row-gap: 1.5rem;

    padding: 0 2rem 2rem 2rem;
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

  .profile--bio {
    grid-column: 1 / -1;

    font-size: var(--font-sm-1);

    max-width: 44.5rem;
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

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2 / -1;

    padding: 0 2rem 2rem 2rem;

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

    .profile--bio {
      grid-column: 2 / -1;

      position: relative;
      bottom: 60%;

      height: 7.2rem;
    }
  }
`;

const Profile = () => {
  const [isFollowContainerVisible, setIsFollowContainerVisible] = useState(false);
  const [isFollowingClicked, setIsFollowingClicked] = useState(false);
  const screenSize = useScreenSize();

  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosFetch.get("/users/655dacad67d703292592ecc1");
      console.log(data);
      return data;
    },
  });

  return (
    <ProfileWrapper>
      {isError && (
        <div className="perr-container">
          <Error />
        </div>
      )}
      {isPending && (
        <div className="perr-container">
          <PulseLoader color="var(--color-blue)" />
        </div>
      )}
      {!isError && !isPending && (
        <div>
          <FollowContainer
            listName={isFollowingClicked ? "Following" : "Followers"}
            followData={isFollowingClicked ? data.following : data.followers}
            isFollowContainerVisible={isFollowContainerVisible}
            setIsFollowContainerVisible={setIsFollowContainerVisible}
            setIsFollowingClicked={setIsFollowingClicked}
          />
          <section className="profile--user-information">
            <ProfilePicture
              width={screenSize.width >= 767 ? "15rem" : "7.7rem"}
              height={screenSize.width >= 767 ? "15rem" : "7.7rem"}
              url={data.profilePictureInfo.imageUrl}
            />
            <div>
              <p className="profile--username">{data.username}</p>
              <button className="profile--edit-btn">Edit profile</button>
            </div>
            <ProfileStats
              screenType={"mid"}
              data={[data.numPosts, data.followers.length, data.following.length]}
              setIsFollowContainerVisible={setIsFollowContainerVisible}
              setIsFollowingClicked={setIsFollowingClicked}
            />
            <p className="profile--bio">{!data.bio ? "No bio yet." : data.bio}</p>
          </section>
          <ProfileStats
            screenType={"small"}
            data={[data.numPosts, data.followers.length, data.following.length]}
            setIsFollowContainerVisible={setIsFollowContainerVisible}
            setIsFollowingClicked={setIsFollowingClicked}
          />
          <section className="profile--user-content">
            <nav>
              <NavLink
                to="/dashboard/profile"
                end>
                <UserPostsIcon
                  width={"2.5rem"}
                  height={"2.5rem"}
                />
              </NavLink>
              <NavLink to="/dashboard/profile/saved-posts">
                <SavedPostsIcon
                  width={"2.5rem"}
                  height={"2.5rem"}
                />
              </NavLink>
            </nav>
            <PostsContainer
              postsData={data.postsInfo}
              isPosts={true}
            />
          </section>
        </div>
      )}
    </ProfileWrapper>
  );
};

const PostsContainerWrapper = styled.div`
  .posts-row--container {
    align-items: stretch;

    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    gap: 0.4rem;
  }

  .posts-row--container > div {
    flex: 1 0 0%;

    width: 27vw;
    height: 31.8vw;
    max-width: 32.73rem;
    max-height: 32.73rem;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

const PostsContainer = ({ postsData, isPosts }) => {
  const perfectThrees = postsData.length / 3;
  let modPostsData = [];
  let leftoverStartInd = 0;

  for (let i = 0; i < perfectThrees; i++) {
    modPostsData.push(postsData.slice(i * 3, i * 3 + 3));
    leftoverStartInd = i * 3 + 3;
  }

  if (leftoverStartInd < postsData.length) modPostsData.push(postsData.slice(leftoverStartInd));

  return (
    <PostsContainerWrapper>
      {isPosts &&
        modPostsData.map((postsRowData) => (
          <PostsRowContainer
            key={postsRowData}
            postsRowData={postsRowData}
            rowLength={postsRowData.length}
          />
        ))}
    </PostsContainerWrapper>
  );
};

const PostsRowContainer = ({ postsRowData, rowLength }) => {
  return (
    <div className="posts-row--container">
      {postsRowData.map((post) => (
        <PostsRow
          key={post._id}
          imageUrl={post.imageUrl}
        />
      ))}
      {rowLength === 1 && (
        <>
          <div></div>
          <div></div>
        </>
      )}
      {rowLength === 2 && <div></div>}
    </div>
  );
};

const PostsRow = ({ imageUrl }) => {
  return <div style={{ backgroundImage: `url(${imageUrl})` }}></div>;
};

//////////////////////////////////////////////////////////////////////////////

const FollowContainerWrapper = styled.section`
  > section {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    background-color: var(--color-dark-gray);

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
    background-color: var(--color-dark-gray);

    border-radius: 0 0 8px 0;
  }

  .follow-container--users::-webkit-scrollbar-thumb {
    background: var(--color-darker-gray);

    border-radius: 0 0 8px 0;
  }
`;

const FollowContainer = ({
  listName,
  followData,
  isFollowContainerVisible,
  setIsFollowContainerVisible,
  setIsFollowingClicked,
}) => {
  return (
    <FollowContainerWrapper>
      <section className={`${isFollowContainerVisible ? "" : "display-none"}`}>
        <nav className="follow-container--nav">
          <p>{listName}</p>
          <button
            onClick={() => {
              setIsFollowContainerVisible(false);
              setIsFollowingClicked(false);
            }}>
            <Exit
              width={"2.5rem"}
              height={"2.5rem"}
            />
          </button>
        </nav>
        <div className="follow-container--users">
          {followData.map((user) => (
            <div key={user._id}>
              <ProfilePicture
                width="3rem"
                height="3rem"
              />
              <p>{user.username}</p>
              <Link to={`/dashboard/profile/${user._id}`}>See profile</Link>
            </div>
          ))}
        </div>
      </section>
    </FollowContainerWrapper>
  );
};

export default Profile;
