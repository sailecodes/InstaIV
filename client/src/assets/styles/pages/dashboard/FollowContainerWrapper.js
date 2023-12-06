import styled from "styled-components";

const FollowContainerWrapper = styled.div`
  background-color: var(--color-shaded-bg);

  position: absolute;
  z-index: 100;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100%;

  padding: 8rem;

  overflow: hidden;

  > section {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;

    width: 30rem;
    height: 40rem;

    border-radius: 8px;
  }

  .follow-container--nav {
    position: relative;

    display: grid;
    place-items: center;

    padding: 1rem;
    border-bottom: 1px solid var(--color-darker-gray);
  }

  .follow-container--nav > p {
    font-size: var(--font-sm-2);
    font-weight: 600;
  }

  .follow-container--nav > button {
    position: absolute;
    right: 2%;

    display: grid;
    place-items: center;
  }

  .follow-container--users {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    padding: 2rem;

    overflow-y: scroll;
  }

  .follow-container--users > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .follow-container--users > div p {
    font-size: var(--font-sm-1);
  }

  .follow-container--users > div a {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 9rem;
    height: 3rem;

    font-size: var(--font-sm-1);

    margin-left: auto;
    border-radius: 5px;
  }

  .follow-container--users::-webkit-scrollbar-track {
    background-color: var(--color-darker-gray);

    border-radius: 0 0 8px 0;
  }

  .follow-container--users::-webkit-scrollbar-thumb {
    background: var(--color-dark-gray);

    border-radius: 0 0 8px 0;
  }

  @media (min-width: 768px) {
    > section {
      width: 40rem;
      height: 40rem;
    }
  }
`;

export default FollowContainerWrapper;
