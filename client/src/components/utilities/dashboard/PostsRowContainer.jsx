import PostsRow from "../../utilities/dashboard/PostsRow";

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

export default PostsRowContainer;
