import ClipLoader from "react-spinners/ClipLoader";
import SubmitBtnWrapper from "../../../assets/styles/general/SubmitBtnWrapper";

const SubmitBtn = ({ isPending, text }) => {
  return (
    <SubmitBtnWrapper type="submit">
      {isPending ? (
        <ClipLoader
          size={10}
          color={"var(--color-white)"}
        />
      ) : (
        text
      )}
    </SubmitBtnWrapper>
  );
};
export default SubmitBtn;
