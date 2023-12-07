import styled from "styled-components";

const ProfileInteractBtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    color: var(--color-white);

    width: 11.5rem;
    height: 3.2rem;

    font-size: var(--font-sm-1);
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  button.Follow {
    background-color: var(--color-blue);
  }

  button.Unfollow {
    background-color: var(--color-border);
  }

  @media (min-width: 425px) {
    button {
      font-size: var(--font-sm-2);
    }
  }
`;

export default ProfileInteractBtnsWrapper;
