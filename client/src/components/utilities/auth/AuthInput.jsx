import AuthInputWrapper from "../../../assets/styles/auth/AuthInputStyle";
import AuthErrorIcon from "../icons/AuthErrorIcon";

const AuthInput = ({ type, name, placeholder, error, setError }) => {
  return (
    <AuthInputWrapper>
      <input
        type={type ? type : name}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={() => setError(false)}
      />
      <div className="input--error-box">{error ? <AuthErrorIcon /> : ""}</div>
    </AuthInputWrapper>
  );
};

export default AuthInput;
