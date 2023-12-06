import styled from "styled-components";

const HomeWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding: 2rem;
  padding-top: 2.5rem;

  overflow-x: hidden;
  overflow-y: auto;

  .home--posts-container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .home--post {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding-bottom: 4rem;
    border-bottom: 1px solid var(--color-border);
  }

  .home--post:last-child {
    border: none;
  }

  .home--post a {
    color: var(--color-white);

    font-size: var(--font-sm-1);
    font-weight: 500;
  }

  .home--post > header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .home--post > header img {
    width: 3.5rem;
    height: 3.5rem;
  }

  .home--post-date {
    color: var(--color-font-gray);

    font-size: var(--font-sm-1);
  }

  .home--post-dot {
    color: var(--color-font-gray);

    font-size: var(--font-sm-1);
  }

  .home--post-btn {
    margin-left: auto;
  }

  .home--post-content {
    width: 32rem;
    height: auto;

    border-radius: 1%;
  }

  .home--post-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8rem;
  }

  .home--post-text {
    font-size: var(--font-sm-1);
  }

  .home--post-text a {
    font-weight: 600;

    margin-right: 1rem;
  }

  @media (min-width: 425px) {
    .home--post a {
      font-size: var(--font-sm-2);
    }

    .home--post > header img {
      width: 4rem;
      height: 4rem;
    }

    .home--post-date {
      font-size: var(--font-sm-2);
    }

    .home--post-dot {
      font-size: var(--font-sm-2);
    }

    .home--post-content {
      width: 38rem;
    }

    .home--post-text {
      font-size: var(--font-sm-2);
    }
  }

  @media (min-width: 500px) {
    .home--post-content {
      width: 46.8rem;
    }
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

export default HomeWrapper;
