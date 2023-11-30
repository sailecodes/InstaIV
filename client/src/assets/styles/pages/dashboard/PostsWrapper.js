import styled from "styled-components";

const PostsWrapper = styled.div`
  .posts-row--container {
    align-items: stretch;

    display: flex;
    flex-shrink: 0;
    gap: 0.4rem;

    margin-bottom: 0.4rem;
  }

  .posts-row--container > div {
    flex: 1 0 0%;

    width: 27vw;
    height: 31.8vw;
    max-width: 32.73rem;
    max-height: 32.73rem;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

export default PostsWrapper;
