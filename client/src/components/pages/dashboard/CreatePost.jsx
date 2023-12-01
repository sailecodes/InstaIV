import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "@tanstack/react-query";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import CreatePostInput from "../../utilities/dashboard/CreatePostInput";
import CreatePostWrapper from "../../../assets/styles/pages/dashboard/CreatePostWrapper";
import Footer from "../../utilities/dashboard/Footer";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => {
      return axiosFetch.post("/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      navigate(`/dashboard/profile/${localStorage.getItem("userId")}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  };

  return (
    <CreatePostWrapper>
      {isError && (
        <div className="perr-container">
          <Error />
        </div>
      )}
      {!isError && (
        <form
          className="create-post--form"
          onSubmit={handleSubmit}
          encType="multipart/form-data">
          <CreatePostInput
            type={"file"}
            name={"content"}
          />
          <CreatePostInput
            type={"text"}
            name={"caption"}
            placeholder={"Enter caption"}
          />
          <button type="submit">
            {isPending ? (
              <ClipLoader
                size={13}
                color="var(--color-white)"
              />
            ) : (
              "Post"
            )}
          </button>
        </form>
      )}
      <Footer />
    </CreatePostWrapper>
  );
};

export default CreatePost;
