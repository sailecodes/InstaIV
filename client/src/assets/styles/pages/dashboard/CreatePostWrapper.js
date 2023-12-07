import styled from "styled-components";

const CreatePostWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding: 2rem;
  padding-top: 2.6rem;

  .create-post--form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .create-post--form > button {
    width: 9rem;
  }

  @media (min-width: 425px) {
    .create-post--form > button {
      width: 9rem;
    }
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2 / -1;
  }
`;

export default CreatePostWrapper;
