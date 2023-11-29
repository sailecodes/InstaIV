import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import CreatePostInput from "../../utilities/dashboard/CreatePostInput";
import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import { AppContext } from "../../../App";

const EditProfileWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;

  padding: 5rem 2rem 5rem 2rem;

  form {
    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  form > div:nth-child(2) {
    margin-bottom: 2rem;
  }

  button {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 9rem;
    height: 3rem;

    border-radius: 8px;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const EditProfile = () => {
  const { setUserProfilePictureUrl } = useContext(AppContext);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch("/users/profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
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
        <div className="perr-container">
          <Error />
        </div>
      )}
      {!isError && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <CreatePostInput type="file" name="profilePicture" />
          <CreatePostInput type="text" name="bio" placeholder="Enter bio" />
          <button type="submit">{isPending ? <ClipLoader size={13} color="var(--color-white)" /> : "Submit"}</button>
        </form>
      )}
    </EditProfileWrapper>
  );
};

export default EditProfile;
