import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";

import AuthWrapper from "../../../assets/styles/pages/auth/AuthWrapper";
import axiosFetch from "../../../utilities/axiosFetch";
import Logo from "../../utilities/general/Logo";
import AuthInput from "../../utilities/auth/AuthInput";
import { AppContext } from "../../../App";

const Login = () => {
  const navigate = useNavigate();
  const [emailErrorIcon, setEmailErrorIcon] = useState(false);
  const [passwordErrorIcon, setPasswordErrorIcon] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState(null);
  const { setUserId, setUserProfilePictureUrl } = useContext(AppContext);

  const { mutate, isPending } = useMutation({
    mutationFn: (loginData) => {
      return axiosFetch.post("/auth/login", loginData);
    },
    onSuccess: (data) => {
      navigate("/dashboard");
      setUserId(data?.data?.data._id);
      setUserProfilePictureUrl(data?.data?.data.profilePictureInfo.imageUrl);
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
            <button type="submit">
              {isPending ? (
                <ClipLoader
                  size={10}
                  color={"var(--color-white)"}
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
        <div className="auth--error-container">{errorMsgs && errorMsgs.map((msg) => <p key={msg}>*{msg}</p>)}</div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
