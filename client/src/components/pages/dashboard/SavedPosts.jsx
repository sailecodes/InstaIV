import { useContext } from "react";

import PostsWrapper from "../../../assets/styles/pages/dashboard/PostsWrapper";
import PostsRowContainer from "../../utilities/dashboard/PostsRowContainer";
import { getPerfectThrees } from "../../../utilities/helpers";
import { ProfileContext } from "./Profile";

const SavedPosts = () => {
  const { data } = useContext(ProfileContext);
  const savedPostsInfo = getPerfectThrees(data.savedPostsInfo);

  return (
    <PostsWrapper>
      {savedPostsInfo.map((postsRowData) => (
        <PostsRowContainer
          key={postsRowData}
          postsRowData={postsRowData}
          rowLength={postsRowData.length}
        />
      ))}
    </PostsWrapper>
  );
};

export default SavedPosts;
