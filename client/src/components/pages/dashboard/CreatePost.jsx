import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "@tanstack/react-query";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";

const CreatePostWrapper = styled.div`
  position: relative;

  padding: 5rem 2rem 5rem 2rem;

  .create-post--form {
    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    width: 100%;
    height: 100%;
  }

  .create-post--form > div:nth-child(2) {
    margin-bottom: 2rem;
  }

  .create-post--form > button {
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
    grid-column: 2 / -1;
  }
`;

const CreatePost = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => {
      return axiosFetch.post("/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  };

  return (
    <CreatePostWrapper>
      {isError && (
        <div className="perr-container">
          <Error />
        </div>
      )}
      {!isError && (
        <form
          className="create-post--form"
          onSubmit={handleSubmit}
          encType="multipart/form-data">
          <CreatePostInput
            type={"file"}
            name={"content"}
          />
          <CreatePostInput
            type={"text"}
            name={"caption"}
            placeholder={"Enter caption"}
          />
          <button type="submit">
            {isPending ? (
              <ClipLoader
                size={13}
                color="var(--color-white)"
              />
            ) : (
              "Post"
            )}
          </button>
        </form>
      )}
    </CreatePostWrapper>
  );
};

const CreatePostInputWrapper = styled.div`
  > input[type="text"] {
    width: 35rem;

    font-size: var(--font-sm-1);

    padding: 1rem;
    border-radius: 8px;
  }

  > input[type="file"] {
    display: grid;
    place-items: center;

    width: 35rem;

    font-size: var(--font-sm-1);
  }

  > input[type="file"]::file-selector-button {
    color: var(--color-black);

    border-radius: 6px;
  }
`;

const CreatePostInput = ({ type, name, placeholder }) => {
  return (
    <CreatePostInputWrapper>
      <input
        type={type ? type : name}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </CreatePostInputWrapper>
  );
};

export default CreatePost;
