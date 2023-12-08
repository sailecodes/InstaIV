import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 2rem;
  padding-top: 2.6rem;

  overflow-y: auto;

  > div {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  > div > div:nth-child(1) {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 30rem;
  }

  input {
    background-color: var(--color-border);
    color: var(--color-white);

    width: 24rem;
    height: 4.1rem;

    font-size: var(--font-sm-1);

    padding: 0 2rem 0 2rem;
    border-radius: 8px;
  }

  > div > div:nth-child(1) button {
    color: var(--color-blue);

    font-size: var(--font-sm-1);

    margin-left: auto;
  }

  .search-data--container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .search-data--container > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .search-data--container img {
    width: 3rem;
    height: 3rem;
  }

  .search-data--username {
    font-size: var(--font-sm-1);
  }

  .search-data--username + a {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 9rem;
    height: 3.1rem;

    font-size: var(--font-sm-1);

    margin-left: auto;
    border-radius: 5px;
  }

  @media (min-width: 425px) {
    > div > div:nth-child(1) {
      width: 35rem;
    }

    input {
      width: 27rem;

      font-size: var(--font-sm-2);
    }

    > div > div:nth-child(1) button {
      font-size: var(--font-sm-2);
    }

    .search-data--container img {
      width: 3.3rem;
      height: 3.3rem;
    }

    .search-data--username {
      font-size: var(--font-sm-2);
    }

    .search-data--username + a {
      width: 10.5rem;

      height: 3.5rem;

      font-size: var(--font-sm-2);
    }
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

export default SearchWrapper;
