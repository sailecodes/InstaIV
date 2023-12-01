import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6rem;

  padding: 2rem;

  overflow-y: scroll;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }

  > div > div:nth-child(1) {
    position: relative;

    display: flex;
    align-items: center;
  }

  > div > div:nth-child(1) button {
    position: absolute;
    right: -20%;

    color: var(--color-blue);

    font-size: var(--font-sm-1);
  }

  input {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    width: 30rem;
    height: 3.6rem;

    font-size: var(--font-sm-1);

    padding: 0 2rem 0 2rem;
    border-radius: 8px;
  }

  .search-data--container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .search-data--container > p {
    font-size: var(--font-sm-3);
    font-weight: 600;
  }

  .search-data--container > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    width: 30rem;
  }

  .search-data--container > div p {
    font-size: var(--font-sm-1);
  }

  .search-data--container > div a {
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

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

export default SearchWrapper;
