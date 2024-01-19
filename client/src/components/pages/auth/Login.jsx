import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";

import AuthWrapper from "../../../assets/styles/pages/auth/AuthWrapper";
import axiosFetch from "../../../utilities/axiosFetch";
import Logo from "../../utilities/general/Logo";
import AuthInput from "../../utilities/auth/AuthInput";
import SubmitBtn from "../../utilities/general/SubmitBtn";
import { AppContext } from "../../../App";
import AuthErrorsContainer from "../../utilities/auth/AuthErrorsContainer";

const Login = () => {
  const navigate = useNavigate();
  const { setUserPfpUrl } = useContext(AppContext);
  const [emailErrorIcon, setEmailErrorIcon] = useState(false);
  const [passwordErrorIcon, setPasswordErrorIcon] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (loginData) => {
      return axiosFetch.post("/auth/login", loginData);
    },
    onSuccess: (data) => {
      navigate("/dashboard");
      localStorage.setItem("userId", data?.data?.data._id);
      localStorage.setItem(
        "userPfpUrl",
        data?.data?.data?.pfpInfo?.contentUrl ? data.data.data.pfpInfo.contentUrl : ""
      );
      setUserPfpUrl(localStorage.getItem("userPfpUrl"));
    },
    onError: (error) => {
      const errors = error?.response?.data?.msg;
      let msgs = null;

      if (errors) msgs = errors.split(",");

      if (msgs) {
        for (let i = 0; i < msgs.length; i++) {
          if (msgs[i].includes("Email")) setEmailErrorIcon(true);
          else if (msgs[i].includes("Password")) setPasswordErrorIcon(true);
        }

        setErrorMsgs(msgs);
      } else {
        return <h1>Something went wrong, please try again later.</h1>;
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  };

  return (
    <AuthWrapper>
      <div className="auth--container">
        <Logo isInAuthPage={true} />
        <div className="auth--input-container">
          <form onSubmit={handleLogin}>
            <AuthInput
              name="email"
              placeholder="Email"
              error={emailErrorIcon}
              setErrorIcon={setEmailErrorIcon}
              setErrorMsgs={setErrorMsgs}
            />
            <AuthInput
              name="password"
              placeholder="Password"
              error={passwordErrorIcon}
              setErrorIcon={setPasswordErrorIcon}
              setErrorMsgs={setErrorMsgs}
            />
            <SubmitBtn
              isPending={isPending}
              text="Login"
            />
          </form>
          <p>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </p>
          <p>Or, testing the app? Try:</p>
          <p>
            Email: <span>admin@gmail.com</span> | P/w: <span>asdfasdfasdf</span>
          </p>
        </div>
        <AuthErrorsContainer errorMsgs={errorMsgs} />
      </div>
    </AuthWrapper>
  );
};

export default Login;
