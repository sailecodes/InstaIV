import styled from "styled-components";

const SubmitBtnWrapper = styled.button`
  background-color: var(--color-font-blue);
  color: var(--color-font-white);

  width: 100%;
  height: 3.2rem;

  font-size: var(--font-sm-1);
  font-family: inherit;

  margin-top: 1rem;
  border: none;
  border-radius: 5px;

  :hover {
    cursor: pointer;
  }

  @media (min-width: 425px) {
    font-size: var(--font-sm-2);
  }
`;

export default SubmitBtnWrapper;
