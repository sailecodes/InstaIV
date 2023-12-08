import styled from "styled-components";

const ProfileWrapper = styled.div`
  position: relative;

  padding: 2rem 0 0 0;

  overflow-x: hidden;
  overflow-y: auto;

  > div {
    max-width: 99rem;
  }

  .profile--user-information {
    display: grid;
    grid-template-columns: 7.7rem 1fr;
    grid-template-rows: 7.8rem 1fr 6rem;
    column-gap: 2rem;
    row-gap: 1.5rem;

    border-bottom: 1px solid var(--color-btn-hover);
  }

  .profile--user-information > img {
    grid-row: 1;
    grid-column: 1;

    justify-self: center;
    align-self: center;

    width: 7rem;
    height: 7rem;

    margin-left: 2rem;
  }

  .profile--header {
    grid-row: 1;
    grid-column: 2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    margin-left: 0.5rem;
  }

  .profile--username {
    font-size: var(--font-sm-2);
    font-weight: 500;
  }

  .profile--username + a {
    background-color: var(--color-border);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 10rem;
    height: 3.1rem;

    font-size: var(--font-sm-1);
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  .profile--username + a:hover {
    cursor: pointer;
  }

  .profile--bio {
    grid-row: 2;
    grid-column: 1 / -1;

    font-size: var(--font-sm-1);

    max-width: 44.5rem;

    padding: 0 0 1.5rem 2rem;
  }

  .profile--user-content > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    padding: 0.8rem 0 0.8rem 0;
  }

  .profile--user-content svg {
    width: 2.5rem;
    height: 2.5rem;
  }

  .profile--user-content .active svg {
    stroke: var(--color-blue);
    fill: var(--color-blue);
  }

  @media (min-width: 425px) {
    .profile--user-information > img {
      width: 7.7rem;
      height: 7.7rem;
    }

    .profile--header {
      margin-left: 0.7rem;
    }

    .profile--username {
      font-size: var(--font-sm-3);
    }

    .profile--username + a {
      width: 11.5rem;
      height: 3.5rem;

      font-size: var(--font-sm-2);
    }

    .profile--bio {
      font-size: var(--font-sm-2);
    }

    .profile--user-content svg {
      width: 2.8rem;
      height: 2.8rem;
    }
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2 / -1;

    padding: 2rem;

    > div {
      margin: 0 auto;
    }

    .profile--user-information {
      grid-template-columns: 15rem 1fr;
    }

    .profile--user-information > img {
      position: relative;
      top: 57%;

      width: 15rem;
      height: 15rem;
    }

    .profile--header {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
    }

    .profile--bio {
      grid-row: 3;
      grid-column: 2;

      position: relative;
      bottom: 15%;

      height: 7.2rem;

      padding: 0 0 0 0.8rem;
    }
  }
`;

export default ProfileWrapper;
