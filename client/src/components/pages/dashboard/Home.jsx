import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import PulseLoader from "react-spinners/PulseLoader";
import HeartIcon from "../../utilities/icons/HeartIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import DeleteIcon from "../../utilities/icons/DeleteIcon";
import { useState } from "react";

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
    justify-content: center;
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

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const Home = () => {
  const [heartIconClicked, setHeartIconClicked] = useState(false);
  const [savedIconClicked, setSavedIconClicked] = useState(false);

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

  return (
    <HomeWrapper>
      {isError && <Error />}
      {isPending && <PulseLoader color="var(--color-blue)" />}
      {!isError && !isPending && (
        <div className="home--posts-container">
          <div className="home--post">
            <header>
              <img className="home--post-pp" src={data[0]?.contentInfo?.imageUrl} />
              <p className="home--post-username">elias.iv_</p>
              <button className="home--post-btn">
                <DeleteIcon fill="var(--color-white)" stroke="none" width="3rem" height="3rem" />
              </button>
            </header>
            <img className="home--post-content" src={data[0]?.contentInfo?.imageUrl} />
            <div className="home--post-btns">
              <div>
                <button className="home--post-btn" onClick={() => setHeartIconClicked(!heartIconClicked)}>
                  <HeartIcon
                    fill={heartIconClicked ? "var(--color-red)" : ""}
                    stroke="var(--color-red)"
                    width="3rem"
                    height="3rem"
                  />
                </button>
                <div>131</div>
              </div>
              <div>
                <button className="home--post-btn" onClick={() => setSavedIconClicked(!savedIconClicked)}>
                  <SavedPostsIcon
                    fill={savedIconClicked ? "var(--color-yellow)" : ""}
                    stroke="var(--color-yellow)"
                    width="2.8rem"
                    height="2.8rem"
                  />
                </button>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </HomeWrapper>
  );
};

export default Home;
