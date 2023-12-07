import { useContext } from "react";

import ProfilePostsRow from "../../utilities/dashboard/ProfilePostsRow";
import ProfilePostsWrapper from "../../../assets/styles/pages/dashboard/ProfilePostsWrapper";
import { getPerfectThrees } from "../../../utilities/helpers";
import { ProfileContext } from "./Profile";

const ProfileSavedPosts = () => {
  const { data } = useContext(ProfileContext);
  const savedPostsInfo = getPerfectThrees(data.savedPostsInfo);

  return (
    <ProfilePostsWrapper>
      {savedPostsInfo.map((postsRowData) => (
        <ProfilePostsRow
          key={postsRowData}
          rowData={postsRowData}
          rowNumItems={postsRowData.length}
        />
      ))}
    </ProfilePostsWrapper>
  );
};

export default ProfileSavedPosts;
