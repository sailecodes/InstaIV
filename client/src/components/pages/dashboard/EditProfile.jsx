import styled from "styled-components";
import CreatePostInput from "../../utilities/dashboard/CreatePostInput";
import ClipLoader from "react-spinners/ClipLoader";

const EditProfileWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;

  padding: 5rem 2rem 5rem 2rem;

  > div {
    width: 20rem;

    border: 1px solid var(--color-dark-gray);
  }

  form {
    position: relative;
    bottom: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  form > div:nth-child(2) {
    margin-bottom: 2rem;
  }

  button {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 9rem;
    height: 3rem;

    border-radius: 8px;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const EditProfile = () => {
  const isPending = false;

  return (
    <EditProfileWrapper>
      <form>
        <CreatePostInput type="file" name="profilePicture" />
        <CreatePostInput type="text" name="bio" placeholder="Enter bio" />
        <button type="submit">{isPending ? <ClipLoader size={13} color="var(--color-white)" /> : "Submit"}</button>
      </form>
    </EditProfileWrapper>
  );
};

export default EditProfile;
