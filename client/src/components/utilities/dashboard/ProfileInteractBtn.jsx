import ClipLoader from "react-spinners/ClipLoader";

const ProfileInteractBtn = ({ mutation, text }) => {
  return (
    <button
      className={`profile-interact-btn ${text}`}
      onClick={() => mutation.mutate()}>
      {mutation.isPending ? (
        <ClipLoader
          size={13}
          color="var(--color-white)"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default ProfileInteractBtn;
