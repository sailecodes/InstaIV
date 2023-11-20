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

  const { mutation, isPending } = useMutation({
    mutationFn: (loginData) => {
      return axiosFetch.post("/auth/login", loginData);
    },
    onError: (error) => {
      const msgs = error?.response?.data?.msg.split(",");
      console.log(msgs);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutation(data);
  };

  return (
    <AuthWrapper>
      <div className="auth--container">
        <Logo isLarge={true} />
        <div className="auth--input-container">
          <form onSubmit={handleSubmit}>
            <AuthInput name="email" placeholder="Email" />
            <AuthInput name="password" placeholder="Password" />
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
