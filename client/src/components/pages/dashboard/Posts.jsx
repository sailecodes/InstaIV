import { useOutletContext } from "react-router-dom";

import PostsContainerWrapper from "../../../assets/styles/pages/dashboard/PostsContainerWrapper";
import PostsRowContainer from "../../utilities/dashboard/PostsRowContainer";
import { getPerfectThrees } from "../../../utilities/helpers";

const Posts = () => {
  let { postsInfo } = useOutletContext();
  postsInfo = getPerfectThrees(postsInfo);

  return (
    <PostsContainerWrapper>
      {postsInfo.map((postsRowData) => (
        <PostsRowContainer
          key={postsRowData}
          postsRowData={postsRowData}
          rowLength={postsRowData.length}
        />
      ))}
    </PostsContainerWrapper>
  );
};

export default Posts;
