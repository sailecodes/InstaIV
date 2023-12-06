import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import PulseLoader from "react-spinners/PulseLoader";
import HeartIcon from "../../utilities/icons/HeartIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import DeleteIcon from "../../utilities/icons/DeleteIcon";
import Footer from "../../utilities/dashboard/Footer";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";

const HomeWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding: 2rem;

  overflow-x: hidden;
  overflow-y: scroll;

  .home--posts-container {
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }

  .home--posts-empty {
    font-size: var(--font-sm-2);
    font-weight: 600;
  }

  .home--post {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding-bottom: 5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .home--post:last-child {
    border: none;
  }

  .home--post a {
    color: var(--color-white);

    font-size: var(--font-sm-2);
    font-weight: 500;
  }

  .home--post > header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .home--post-pfp {
    width: 4.2rem;
    height: 4.2rem;

    border-radius: 50%;
  }

  .home--post-date {
    color: var(--color-font-gray);

    font-size: var(--font-sm-2);
  }

  .home--post-dot {
    color: var(--color-font-gray);

    font-size: var(--font-sm-2);
  }

  .home--post-mutations {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    margin-left: auto;
  }

  .home--post-btn {
    margin-left: auto;
  }

  .home--post-content {
    width: 46.8rem;
    height: auto;

    border-radius: 1%;
  }

  ///////////////////////////////////////

  .home--post-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8rem;
  }

  .home--post-btn {
    display: grid;
    place-items: center;
  }

  .home--post-btn svg {
    transition: fill 0.3s;
  }

  .home--post-btns > div {
    color: var(--color-font-white);

    display: flex;
    align-items: center;
    gap: 1rem;

    width: 4.6rem;

    font-size: var(--font-sm-2);
  }

  .home--post-text {
    font-size: var(--font-sm-2);
  }

  .home--post-text a {
    font-weight: 600;

    margin-right: 1rem;
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const Home = () => {
  const queryClient = useQueryClient();

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

  const deletePost = useMutation({
    mutationFn: (data) => {
      return axiosFetch.delete(`/posts/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePostLikes = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch(`/posts/${data.id}/like`, { statFlag: data.statFlag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePostSaves = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch(`/posts/${data.id}/save`, { statFlag: data.statFlag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <HomeWrapper>
      {isError && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Error />
        </div>
      )}
      {isPending && (
        <div style={{ width: "46.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PulseLoader color="var(--color-blue)" />
        </div>
      )}
      {!isError && !isPending && (
        <div className="home--posts-container">
          {data.length === 0 && (
            <div style={{ display: "grid", placeItems: "center" }}>
              <p className="home--posts-empty">No posts yet!</p>
            </div>
          )}
          {data.length !== 0 && (
            <>
              {data.map((post) => (
                <div
                  className="home--post"
                  key={post._id}>
                  <header>
                    <ProfilePicture
                      width="4rem"
                      height="4rem"
                      userPfpUrl={post.userInfo.imageUrl}
                    />
                    <Link to={`/dashboard/profile/${post.userInfo.userId}`}>{post.userInfo.username}</Link>
                    <div className="home--post-dot">&middot;</div>
                    <p className="home--post-date">
                      {new Date(post.createdAt).toLocaleDateString("en-us", { month: "short", day: "numeric" })}
                    </p>
                    {localStorage.getItem("userId") === post.userInfo.userId && (
                      <div className="home--post-mutations">
                        <button
                          className="home--post-btn"
                          onClick={() => deletePost.mutate({ id: post._id })}>
                          <DeleteIcon
                            fill="var(--color-white)"
                            stroke="none"
                            width="3.1rem"
                            height="3.1rem"
                          />
                        </button>
                      </div>
                    )}
                  </header>
                  <img
                    className="home--post-content"
                    src={post?.contentInfo?.imageUrl}
                  />
                  <div className="home--post-btns">
                    <div>
                      <button
                        className="home--post-btn"
                        onClick={() =>
                          updatePostLikes.mutate({
                            statFlag: !post.likesInfo.users[localStorage.getItem("userId")],
                            id: post._id,
                          })
                        }>
                        <HeartIcon
                          fill={post.likesInfo.users[localStorage.getItem("userId")] ? "var(--color-red)" : ""}
                          stroke="var(--color-red)"
                          width="2.8rem"
                          height="2.8rem"
                        />
                      </button>
                      <div>{post.likesInfo.num}</div>
                    </div>
                    <div>
                      <button
                        className="home--post-btn"
                        onClick={() =>
                          updatePostSaves.mutate({
                            statFlag: !post.savesInfo.users[localStorage.getItem("userId")],
                            id: post._id,
                          })
                        }>
                        <SavedPostsIcon
                          fill={post.savesInfo.users[localStorage.getItem("userId")] ? "var(--color-yellow)" : ""}
                          stroke="var(--color-yellow)"
                          width="2.4rem"
                          height="2.4rem"
                        />
                      </button>
                      <div>{post.savesInfo.num}</div>
                    </div>
                  </div>
                  <p className="home--post-text">
                    <Link to={`/dashboard/profile/${post.userInfo.userId}`}>{post.userInfo.username}</Link>
                    {post.caption}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
