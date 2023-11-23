import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthWrapper from "../../../assets/styles/pages/auth/AuthWrapper";
import axiosFetch from "../../../utilities/axiosFetch";
import Logo from "../../utilities/general/Logo";
import AuthInput from "../../utilities/auth/AuthInput";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (registerData) => {
      return axiosFetch.post("/auth/register", registerData);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      const errors = error?.response?.data?.msg;
      let msgs = null;

      if (errors) msgs = errors.split(",");

      if (msgs[0]) {
        if (msgs[0].includes("Email")) setEmailError(true);
        else if (msgs[0].includes("Password")) setPasswordError(true);
        else if (msgs[0].includes("Username")) setUsernameError(true);
      }

      if (msgs[1]) {
        if (msgs[1].includes("Password")) setPasswordError(true);
        else if (msgs[1].includes("Username")) setUsernameError(true);
      }

      if (msgs[2] && msgs[2].includes("Username")) setUsernameError(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  };

  return (
    <AuthWrapper>
      <div className="auth--container">
        <Logo isLarge={true} />
        <div className="auth--input-container">
          <form onSubmit={handleSubmit}>
            <AuthInput
              name="email"
              placeholder="Email"
              error={emailError}
              setError={setEmailError}
            />
            <AuthInput
              name="password"
              placeholder="Password"
              error={passwordError}
              setError={setPasswordError}
            />
            <AuthInput
              type="text"
              name="username"
              placeholder="Username"
              error={usernameError}
              setError={setUsernameError}
            />
            <button type="submit">
              {isPending ? (
                <ClipLoader
                  size={10}
                  color={"var(--color-white)"}
                />
              ) : (
                "Register"
              )}
            </button>
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
