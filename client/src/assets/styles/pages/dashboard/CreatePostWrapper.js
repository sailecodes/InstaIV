import styled from "styled-components";

const CreatePostWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding: 2rem;

  .create-post--form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    width: 36rem;

    padding-top: 4rem;
  }

  .create-post--form > button {
    width: 9rem;
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2 / -1;
  }
`;

export default CreatePostWrapper;
