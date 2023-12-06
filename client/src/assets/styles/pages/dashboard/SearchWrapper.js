import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 2rem;

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

    width: 35rem;
  }

  input {
    background-color: var(--color-dark-gray);
    color: var(--color-font-white);

    width: 27rem;
    height: 3.6rem;

    font-size: var(--font-sm-2);

    padding: 0 2rem 0 2rem;
    border-radius: 8px;
  }

  > div > div:nth-child(1) button {
    color: var(--color-font-blue);

    font-size: var(--font-sm-2);

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

  .search-data--username {
    font-size: var(--font-sm-2);
  }

  .search-data--username + a {
    background-color: var(--color-font-blue);
    color: var(--color-font-white);

    display: grid;
    place-items: center;

    width: 11rem;
    height: 3.2rem;

    font-size: var(--font-sm-2);

    margin-left: auto;
    border-radius: 5px;
  }

  @media (min-width: 768px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

export default SearchWrapper;
