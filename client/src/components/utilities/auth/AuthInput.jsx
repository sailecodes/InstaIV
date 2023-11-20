import AuthInputWrapper from "../../../assets/styles/auth/AuthInputStyle";

const AuthInput = ({ type, name, placeholder }) => {
  return (
    <AuthInputWrapper>
      <input type={type ? type : name} id={name} name={name} placeholder={placeholder} />
    </AuthInputWrapper>
  );
};

export default AuthInput;
