import AuthErrorsContainerWrapper from "../../../assets/styles/pages/auth/AuthErrorsContainerWrapper";

const AuthErrorsContainer = ({ errorMsgs }) => {
  return (
    <AuthErrorsContainerWrapper>
      {errorMsgs && errorMsgs.map((msg) => <p key={msg}>*{msg}</p>)}
    </AuthErrorsContainerWrapper>
  );
};
export default AuthErrorsContainer;
