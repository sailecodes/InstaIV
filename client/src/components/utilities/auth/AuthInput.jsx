import AuthInputWrapper from "../../../assets/styles/pages/auth/AuthInputWrapper";
import AuthErrorIcon from "../icons/AuthErrorIcon";

const AuthInput = ({ type, name, placeholder, error, setErrorIcon, setErrorMsgs }) => {
  return (
    <AuthInputWrapper>
      <input
        type={type ? type : name}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={() => {
          setErrorIcon(false);
          setErrorMsgs(null);
        }}
      />
      <div className="input--error-box">
        {error ? (
          <AuthErrorIcon
            fill="none"
            stroke="var(--color-red)"
            width="2rem"
            height="2rem"
          />
        ) : (
          ""
        )}
      </div>
    </AuthInputWrapper>
  );
};

export default AuthInput;
