import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import AuthWrapper from "../../../assets/styles/auth/AuthStyle";
import axiosFetch from "../../../utilities/axiosFetch";
import Logo from "../../utilities/general/Logo";
import AuthInput from "../../utilities/auth/AuthInput";

const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (loginData) => {
      return axiosFetch.post("/auth/login", loginData);
    },
    onError: (error) => {
      const errors = error?.response?.data?.msg;
      let msgs = null;

      if (errors) msgs = errors.split(",");

      console.log(msgs);

      if (msgs) {
        if (msgs[0]) {
          if (msgs[0].includes("email")) setEmailError(true);
          else if (msgs[0].includes("password") || msgs[0].includes("Password")) setPasswordError(true);
        }

        if (msgs[1] && (msgs[1].includes("password") || msgs[1].includes("Password"))) setPasswordError(true);
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
            <AuthInput name="email" placeholder="Email" error={emailError} setError={setEmailError} />
            <AuthInput name="password" placeholder="Password" error={passwordError} setError={setPasswordError} />
            <button type="submit">{isPending ? <ClipLoader size={10} color={"var(--color-white)"} /> : "Login"}</button>
          </form>
          <p>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
