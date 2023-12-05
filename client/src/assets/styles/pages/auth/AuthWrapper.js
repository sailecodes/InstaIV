import styled from "styled-components";

const AuthWrapper = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  height: 100vh;
  min-width: 50rem;

  .auth--container {
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
    background-color: var(--color-font-blue);
    color: var(--color-font-white);

    width: 100%;
    height: 3.2rem;

    font-size: var(--font-sm-2);
    font-family: inherit;

    margin-top: 1rem;
    border: none;
    border-radius: 5px;
  }

  form > button:hover {
    cursor: pointer;
  }

  .auth--input-container > p {
    color: var(--color-font-white);

    font-size: var(--font-sm-2);
  }

  .auth--input-container > p a {
    color: var(--color-font-blue);

    text-decoration: none;
  }

  .auth--errors-container {
    color: var(--color-font-error);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    font-size: var(--font-sm-2);
  }
`;

export default AuthWrapper;
