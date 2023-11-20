import { Link } from "react-router-dom";

import AuthWrapper from "../../../assets/styles/auth/AuthStyle";
import Logo from "../../utilities/general/Logo";
import AuthInput from "../../utilities/auth/AuthInput";

const Register = () => {
  return (
    <AuthWrapper>
      <div className="auth--container">
        <Logo isLarge={true} />
        <div className="auth--input-container">
          <form>
            <AuthInput name="email" placeholder="Email" />
            <AuthInput name="password" placeholder="Password" />
            <AuthInput type="text" name="username" placeholder="Username" />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};
export default Register;
