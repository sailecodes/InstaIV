import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import PulseLoader from "react-spinners/PulseLoader";
import Footer from "../../utilities/dashboard/Footer";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import HomeWrapper from "../../../assets/styles/pages/dashboard/HomeWrapper";
import HomePostBtn from "../../utilities/dashboard/HomePostBtn";
import HomePostInteractBtns from "../../utilities/dashboard/HomePostInteractBtns";

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
              <h1>No posts yet!</h1>
            </div>
          )}
          {data.length !== 0 && (
            <>
              {data.map((post) => (
                <div
                  className="home--post"
                  key={post._id}>
                  <header>
                    <ProfilePicture userPfpUrl={post.userInfo.imageUrl} />
                    <Link to={`/dashboard/profile/${post.userInfo.userId}`}>{post.userInfo.username}</Link>
                    <div className="home--post-dot">&middot;</div>
                    <p className="home--post-date">
                      {new Date(post.createdAt).toLocaleDateString("en-us", { month: "short", day: "numeric" })}
                    </p>
                    {localStorage.getItem("userId") === post.userInfo.userId && (
                      <HomePostBtn
                        type="delete"
                        onClick={() => deletePost.mutate({ id: post._id })}
                        fill="var(--color-font-white)"
                      />
                    )}
                  </header>
                  <img
                    className="home--post-content"
                    src={post?.contentInfo?.imageUrl}
                  />
                  <HomePostInteractBtns
                    id={post._id}
                    updatePostLikes={updatePostLikes}
                    likesInfo={post.likesInfo}
                    updatePostSaves={updatePostSaves}
                    savesInfo={post.savesInfo}
                  />
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
