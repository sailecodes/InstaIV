import ClipLoader from "react-spinners/ClipLoader";
import AuthSubmitBtnWrapper from "../../../assets/styles/pages/auth/AuthSubmitBtnWrapper";

const AuthSubmitBtn = ({ isPending, text }) => {
  return (
    <AuthSubmitBtnWrapper type="submit">
      {isPending ? (
        <ClipLoader
          size={10}
          color={"var(--color-white)"}
        />
      ) : (
        text
      )}
    </AuthSubmitBtnWrapper>
  );
};
export default AuthSubmitBtn;
