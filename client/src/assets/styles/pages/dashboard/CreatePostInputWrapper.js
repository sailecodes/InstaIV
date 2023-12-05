import styled from "styled-components";

const CreatePostInputWrapper = styled.div`
  > input[type="text"] {
    width: 35rem;

    font-size: var(--font-sm-2);

    padding: 1rem;
    border-radius: 8px;
  }

  > input[type="file"] {
    display: grid;
    place-items: center;

    width: 35rem;

    font-size: var(--font-sm-2);
  }

  > input[type="file"]::file-selector-button {
    color: var(--color-bg);

    border-radius: 6px;
  }
`;

export default CreatePostInputWrapper;
