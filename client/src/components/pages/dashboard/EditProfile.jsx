import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostInput from "../../utilities/dashboard/CreatePostInput";
import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import SubmitBtn from "../../utilities/general/SubmitBtn";
import EditProfileWrapper from "../../../assets/styles/pages/dashboard/EditProfileWrapper";
import { AppContext } from "../../../App";

const EditProfile = () => {
  const { setUserPfpUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const editProfile = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch(`/users/${localStorage.getItem("userId")}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      navigate(`/dashboard/profile/${localStorage.getItem("userId")}`);
      localStorage.setItem(
        "userPfpUrl",
        data?.data?.data?.profilePictureInfo?.imageUrl
          ? data.data.data.profilePictureInfo.imageUrl
          : localStorage.getItem("userPfpUrl")
      );
      setUserPfpUrl(data?.data?.data.profilePictureInfo.imageUrl);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    editProfile.mutate(data);
  };

  return (
    <EditProfileWrapper>
      {editProfile.isError && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Error />
        </div>
      )}
      {!editProfile.isError && (
        <>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data">
            <CreatePostInput
              type="file"
              name="profilePicture"
            />
            <CreatePostInput
              type="text"
              name="bio"
              placeholder="Enter bio"
            />
            <SubmitBtn
              isPending={editProfile.isPending}
              text="Submit"
            />
          </form>
          <p>*Can only change profile picture and/or bio (for now)</p>
        </>
      )}
    </EditProfileWrapper>
  );
};

export default EditProfile;
