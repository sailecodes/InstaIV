import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import PulseLoader from "react-spinners/PulseLoader";
import HeartIcon from "../../utilities/icons/HeartIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import DeleteIcon from "../../utilities/icons/DeleteIcon";
import { AppContext } from "../../../App";

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 2rem;

  .home--posts-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .home--post {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .home--post > header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .home--post > header > button {
    margin-left: auto;
  }

  .home--post-pp {
    width: 4.2rem;
    height: 4.2rem;

    border-radius: 50%;
  }

  .home--post-username {
    font-size: var(--font-sm-1);
  }

  .home--post-content {
    width: 46.8rem;
    height: auto;

    border-radius: 1%;
  }

  .home--post-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8rem;
  }

  .home--post-btns > div {
    color: var(--color-white);

    display: flex;
    align-items: center;
    gap: 1rem;

    font-size: var(--font-sm-1);
  }

  .home--post-btn {
    display: grid;
    place-items: center;
  }

  .home--post-btn svg {
    transition: fill 0.3s;
  }

  .home--post-text {
    font-size: var(--font-sm-1);
  }

  .home--post-text span {
    font-weight: 600;

    margin-right: 1rem;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const Home = () => {
  const { userId } = useContext(AppContext);

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const {
        data: {
          data: { posts },
        },
      } = await axiosFetch.get("/posts");
      return posts;
    },
  });

  console.log(data);
  console.log(userId);

  return (
    <HomeWrapper>
      {isError && <Error />}
      {isPending && <PulseLoader color="var(--color-blue)" />}
      {!isError && !isPending && (
        <div className="home--posts-container">
          <div className="home--post">
            <header>
              <img className="home--post-pp" src={data[3]?.contentInfo?.imageUrl} />
              <p className="home--post-username">{data[3].userInfo.username}</p>
              <button className="home--post-btn">
                <DeleteIcon fill="var(--color-white)" stroke="none" width="3rem" height="3rem" />
              </button>
            </header>
            <img className="home--post-content" src={data[3]?.contentInfo?.imageUrl} />
            <div className="home--post-btns">
              <div>
                <button className="home--post-btn">
                  <HeartIcon
                    fill={data[3].likesInfo.users[userId] ? "var(--color-red)" : ""}
                    stroke="var(--color-red)"
                    width="2.7rem"
                    height="2.7rem"
                  />
                </button>
                <div>{data[3].likesInfo.num}</div>
              </div>
              <div>
                <button className="home--post-btn">
                  <SavedPostsIcon
                    fill={data[3].savesInfo.users[userId] ? "var(--color-yellow)" : ""}
                    stroke="var(--color-yellow)"
                    width="2.5rem"
                    height="2.5rem"
                  />
                </button>
                <div>{data[3].savesInfo.num}</div>
              </div>
            </div>
            <p className="home--post-text">
              <span>{data[3].userInfo.username}</span>
              {data[3].caption}
            </p>
          </div>
        </div>
      )}
    </HomeWrapper>
  );
};

export default Home;
