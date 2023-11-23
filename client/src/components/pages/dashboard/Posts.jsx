import { useContext } from "react";

import PostsWrapper from "../../../assets/styles/pages/dashboard/PostsWrapper";
import PostsRowContainer from "../../utilities/dashboard/PostsRowContainer";
import { getPerfectThrees } from "../../../utilities/helpers";
import { ProfileContext } from "./Profile";

const Posts = () => {
  const { data } = useContext(ProfileContext);
  const postsInfo = getPerfectThrees(data.postsInfo);

  return (
    <PostsWrapper>
      {postsInfo.map((postsRowData) => (
        <PostsRowContainer
          key={postsRowData}
          postsRowData={postsRowData}
          rowLength={postsRowData.length}
        />
      ))}
    </PostsWrapper>
  );
};

export default Posts;
