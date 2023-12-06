import styled from "styled-components";

const AuthErrorsContainerWrapper = styled.div`
  color: var(--color-font-error);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  font-size: var(--font-sm-0);

  @media (min-width: 425px) {
    font-size: var(--font-sm-1);
  }
`;

export default AuthErrorsContainerWrapper;
