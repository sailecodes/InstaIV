import ClipLoader from "react-spinners/ClipLoader";

const ProfileInteractBtn = ({ mutation, text }) => {
  return (
    <button onClick={() => mutation.mutate()}>
      {mutation.isPending ? (
        <ClipLoader
          size={13}
          color="var(--color-font-white)"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default ProfileInteractBtn;
