import ProfilePostsRowItem from "./ProfilePostsRowItem";

const ProfilePostsRow = ({ rowData, rowNumItems }) => {
  return (
    <div className="profile-posts--row-container">
      {rowData.map((post) => (
        <ProfilePostsRowItem
          key={post._id}
          contentUrl={post.contentUrl}
        />
      ))}
      {rowNumItems === 1 && (
        <>
          <div></div>
          <div></div>
        </>
      )}
      {rowNumItems === 2 && <div></div>}
    </div>
  );
};

export default ProfilePostsRow;
