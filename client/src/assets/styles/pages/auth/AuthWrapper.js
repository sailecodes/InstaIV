import styled from "styled-components";

const AuthWrapper = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  height: 100vh;
  min-width: 50rem;

  .auth--container {
    position: relative;
    bottom: 5%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    width: 35rem;
    height: 40rem;

    padding: 1rem;
  }

  .auth--container > div:nth-child(1) {
    margin-top: 2rem;
  }

  .auth--input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  form > button {
    background-color: var(--color-blue);
    color: var(--color-white);

    width: 100%;
    height: 3.2rem;

    font-family: inherit;

    margin-top: 0.8rem;
    border: none;
    border-radius: 5px;
  }

  form > button:hover {
    cursor: pointer;
  }

  .auth--input-container > p {
    color: var(--color-white);

    font-size: var(--font-sm-1);
  }

  .auth--input-container > p a {
    color: var(--color-blue);

    text-decoration: none;
  }
`;

export default AuthWrapper;
