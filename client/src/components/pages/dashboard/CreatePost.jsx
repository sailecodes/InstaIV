import styled from "styled-components";

const CreatePostWrapper = styled.div`
  position: relative;

  padding: 7rem 2rem 5rem 2rem;

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

    width: 9rem;
    height: 3rem;

    border-radius: 4px;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2 / -1;
  }
`;

const CreatePost = () => {
  return (
    <CreatePostWrapper>
      <form className="create-post--form">
        <CreatePostInput
          type={"file"}
          name={"profilePicture"}
        />
        <CreatePostInput
          type={"text"}
          name={"caption"}
          placeholder={"Enter caption"}
        />
        <button type="submit">Post</button>
      </form>
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

    border-radius: 4px;
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
