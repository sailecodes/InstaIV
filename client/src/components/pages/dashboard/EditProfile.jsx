import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostInput from "../../utilities/dashboard/CreatePostInput";
import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import SubmitBtn from "../../utilities/general/SubmitBtn";
import { AppContext } from "../../../App";

const EditProfileWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  > p {
    font-size: var(--font-sm-1);
    font-style: italic;
  }

  button {
    width: 9rem;
  }

  @media (min-width: 425px) {
    > p {
      font-size: var(--font-sm-2);
      font-style: italic;
    }
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const EditProfile = () => {
  const { setUserProfilePictureUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch(`/users/${localStorage.getItem("userId")}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      navigate(`/dashboard/profile/${localStorage.getItem("userId")}`);
      setUserProfilePictureUrl(data?.data?.data.profilePictureInfo.imageUrl);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  };

  return (
    <EditProfileWrapper>
      {isError && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Error />
        </div>
      )}
      {!isError && (
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
              isPending={isPending}
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
