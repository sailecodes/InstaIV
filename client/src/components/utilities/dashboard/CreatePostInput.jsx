import CreatePostInputWrapper from "../../../assets/styles/pages/dashboard/CreatePostInputWrapper";

const CreatePostInput = ({ type, name, placeholder }) => {
  return (
    <CreatePostInputWrapper>
      <input
        type={type ? type : name}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </CreatePostInputWrapper>
  );
};

export default CreatePostInput;
