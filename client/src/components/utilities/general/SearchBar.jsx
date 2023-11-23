import styled from "styled-components";

const SearchBarWrapper = styled.div`
  input {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    width: 26.8rem;
    height: 3.6rem;

    font-size: var(--font-sm-1);

    padding: 0 2rem 0 2rem;
    border-radius: 8px;
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
