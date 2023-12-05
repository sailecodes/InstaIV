import styled from "styled-components";

const AuthWrapper = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  height: 100vh;

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

  .auth--input-container > p {
    color: var(--color-font-white);

    font-size: var(--font-sm-2);
  }

  .auth--input-container > p a {
    color: var(--color-font-blue);

    text-decoration: none;
  }
`;

export default AuthWrapper;
