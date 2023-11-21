import styled from "styled-components";

const CreatePostWrapper = styled.div``;

const CreatePost = () => {
  return (
    <CreatePostWrapper>
      <input />
      <div className="create-post--hl"></div>
      <form>
        <CreatePostInput />
      </form>
    </CreatePostWrapper>
  );
};

const CreatePostInput = ({ name, labelName, placeholder }) => {
  return (
    <>
      <input
        type={name}
        id={name}
        placeholder={placeholder}
      />
    </>
  );
};

export default CreatePost;
