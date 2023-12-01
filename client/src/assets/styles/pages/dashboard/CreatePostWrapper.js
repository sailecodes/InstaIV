import styled from "styled-components";

const CreatePostWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding: 2rem;

  .create-post--form {
    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    width: 36rem;
    height: 100%;

    padding-top: 4rem;
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

export default CreatePostWrapper;
