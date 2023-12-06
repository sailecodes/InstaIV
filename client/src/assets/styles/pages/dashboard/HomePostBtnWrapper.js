import styled from "styled-components";

const HomePostBtnWrapper = styled.div`
  color: var(--color-font-white);

  display: flex;
  align-items: center;
  gap: 1rem;

  width: 4.6rem;

  font-size: var(--font-sm-2);

  &:has(.home-post-btn.delete-btn) {
    display: block;

    margin-left: auto;

    width: auto;
  }

  &:has(.home-post-btn.heart-btn) {
    justify-content: flex-start;
  }

  &:has(.home-post-btn.save-btn) {
    justify-content: flex-end;
  }

  .home-post-btn {
    display: grid;
    place-items: center;
  }

  .home-post-btn.delete-btn {
    width: 3rem;
    height: 3rem;
  }

  .home-post-btn.heart-btn {
    width: 2.4rem;
    height: 2.4rem;
  }

  .home-post-btn.save-btn {
    width: 2.1rem;
    height: 2.1rem;
  }

  .home-post-btn svg {
    transition: fill 0.3s;
  }

  @media (min-width: 425px) {
    .home-post-btn.delete-btn {
      width: 3.4rem;
      height: 3.4rem;
    }

    .home-post-btn.heart-btn {
      width: 2.8rem;
      height: 2.8rem;
    }

    .home-post-btn.save-btn {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

export default HomePostBtnWrapper;
