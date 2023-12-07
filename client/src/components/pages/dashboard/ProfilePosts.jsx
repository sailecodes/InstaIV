import { useContext } from "react";

import ProfilePostsRow from "../../utilities/dashboard/ProfilePostsRow";
import ProfilePostsWrapper from "../../../assets/styles/pages/dashboard/ProfilePostsWrapper";
import { getPerfectThrees } from "../../../utilities/helpers";
import { ProfileContext } from "./Profile";

const ProfilePosts = () => {
  const { data } = useContext(ProfileContext);
  const postsInfo = getPerfectThrees(data.postsInfo);

  return (
    <ProfilePostsWrapper>
      {postsInfo.map((rowData) => (
        <ProfilePostsRow
          key={rowData}
          rowData={rowData}
          rowNumItems={rowData.length}
        />
      ))}
    </ProfilePostsWrapper>
  );
};

export default ProfilePosts;
