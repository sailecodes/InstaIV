import styled from "styled-components";

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

export default EditProfileWrapper;
