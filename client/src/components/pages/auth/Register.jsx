import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import AuthWrapper from "../../../assets/styles/pages/auth/AuthWrapper";
import axiosFetch from "../../../utilities/axiosFetch";
import Logo from "../../utilities/general/Logo";
import AuthInput from "../../utilities/auth/AuthInput";

const Register = () => {
  const navigate = useNavigate();
  const [emailErrorIcon, setEmailErrorIcon] = useState(false);
  const [passwordErrorIcon, setPasswordErrorIcon] = useState(false);
  const [usernameErrorIcon, setUsernameErrorIcon] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (registerData) => {
      return axiosFetch.post("/auth/register", registerData);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      const errors = error?.response?.data?.msg;
      let msgs = null;

      if (errors) msgs = errors.split(",");

      if (msgs) {
        for (let i = 0; i < msgs.length; i++) {
          if (msgs[i].includes("Email")) setEmailErrorIcon(true);
          else if (msgs[i].includes("Password")) setPasswordErrorIcon(true);
          else if (msgs[i].includes("Username")) setUsernameErrorIcon(true);
        }

        setErrorMsgs(msgs);
      } else {
        return <h1>Something went wrong, please try again later.</h1>;
      }
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
              error={emailErrorIcon}
              setError={setEmailErrorIcon}
            />
            <AuthInput
              name="password"
              placeholder="Password"
              error={passwordErrorIcon}
              setError={setPasswordErrorIcon}
            />
            <AuthInput
              type="text"
              name="username"
              placeholder="Username"
              error={usernameErrorIcon}
              setError={setUsernameErrorIcon}
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
        <div className="auth--error-container">{errorMsgs && errorMsgs.map((msg) => <p key={msg}>*{msg}</p>)}</div>
      </div>
    </AuthWrapper>
  );
};
export default Register;
