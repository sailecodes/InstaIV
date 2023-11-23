import styled from "styled-components";

const AuthInputWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  input {
    background-color: var(--color-dark-white);

    width: 28rem;
    height: 4rem;

    font-family: inherit;

    padding: 0.7rem 4rem 0.7rem 0.7rem;
    border: 1px solid var(--color-light-gray);
    border-radius: 5px;
  }

  .input--error-box {
    position: absolute;
    left: 85%;

    display: grid;
    place-items: center;

    width: 4rem;
    height: 4rem;
  }
`;

export default AuthInputWrapper;
