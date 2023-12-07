import styled from "styled-components";

const ProfileFollowContainerWrapper = styled.div`
  background-color: var(--color-shaded-bg);

  position: absolute;
  z-index: 100;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100%;

  padding: 9rem 2rem;

  overflow: hidden;

  > section {
    background-color: var(--color-border);
    color: var(--color-white);

    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;

    width: 25rem;
    height: 35rem;

    border-radius: 8px;
  }

  .follow-container--nav {
    position: relative;

    display: grid;
    place-items: center;

    padding: 1rem;
    border-bottom: 1px solid var(--color-btn-hover);
  }

  .follow-container--nav > p {
    font-size: var(--font-sm-1);
    font-weight: 500;
  }

  .follow-container--nav > button {
    position: absolute;
    right: 2%;

    display: grid;
    place-items: center;
  }

  .follow-container--nav svg {
    width: 2.5rem;
    height: 2.5rem;
  }

  .follow-container--users {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    padding: 2rem 1rem;

    overflow-y: auto;
  }

  .follow-container--users > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .follow-container--users img {
    width: 3rem;
    height: 3rem;
  }

  .follow-container--users > div p {
    font-size: var(--font-sm-0);
  }

  .follow-container--users > div a {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 7.5rem;
    height: 2.5rem;

    font-size: var(--font-sm-0);

    margin-left: auto;
    border-radius: 6px;
  }

  .follow-container--users::-webkit-scrollbar-track {
    background-color: var(--color-btn-hover);

    border-radius: 0 0 8px 0;
  }

  .follow-container--users::-webkit-scrollbar-thumb {
    background: var(--color-border);

    border-radius: 0 0 8px 0;
  }

  @media (min-width: 425px) {
    > section {
      width: 30rem;
      height: 40rem;
    }

    .follow-container--users img {
      width: 3.2rem;
      height: 3.2rem;
    }

    .follow-container--nav > p {
      font-size: var(--font-sm-2);
    }

    .follow-container--users {
      padding: 2rem 1rem;
    }

    .follow-container--users > div p {
      font-size: var(--font-sm-1);
    }

    .follow-container--users > div a {
      width: 9rem;
      height: 3rem;

      font-size: var(--font-sm-1);
    }
  }

  @media (min-width: 768px) {
    > section {
      width: 40rem;
      height: 40rem;
    }

    .follow-container--nav > p {
      font-size: var(--font-sm-3);
    }

    .follow-container--users {
      padding: 2rem;
    }

    .follow-container--users > div p {
      font-size: var(--font-sm-2);
    }

    .follow-container--users > div a {
      width: 11rem;
      height: 3.5rem;

      font-size: var(--font-sm-2);
    }
  }
`;

export default ProfileFollowContainerWrapper;
