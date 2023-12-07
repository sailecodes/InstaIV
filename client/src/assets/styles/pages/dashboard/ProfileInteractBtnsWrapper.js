import styled from "styled-components";

const ProfileInteractBtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background-color: var(--color-blue);
    color: var(--color-white);

    width: 11.5rem;
    height: 3.2rem;

    font-size: var(--font-sm-1);
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  @media (min-width: 425px) {
    button {
      font-size: var(--font-sm-2);
    }
  }
`;

export default ProfileInteractBtnsWrapper;
