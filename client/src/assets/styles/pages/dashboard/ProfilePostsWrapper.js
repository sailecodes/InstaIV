import styled from "styled-components";

const ProfilePostsWrapper = styled.section`
  .profile-posts--row-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .profile-posts--row-container div {
    flex: 1 0 0%;

    width: 27vw;
    height: 31.8vw;
    max-width: 32.73rem;
    max-height: 32.73rem;

    margin-bottom: 0.5rem;
  }

  .profile-posts--row-container div img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

export default ProfilePostsWrapper;
