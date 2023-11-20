import styled from "styled-components";

const SearchBarWrapper = styled.div`
  input {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    width: 26.8rem;
    height: 3.6rem;

    font-size: var(--font-sm-2);

    padding: 0 2rem 0 2rem;
    border: none;
    border-radius: 8px;
  }

  input:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <input placeholder="Search for friends" />
    </SearchBarWrapper>
  );
};

export default SearchBar;
