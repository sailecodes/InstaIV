import HomePostBtnWrapper from "../../../assets/styles/pages/dashboard/HomePostBtnWrapper";
import DeleteIcon from "../icons/DeleteIcon";
import HeartIcon from "../icons/HeartIcon";
import SavedPostsIcon from "../icons/SavedPostsIcon";

const HomePostBtn = ({ type, onClick, fill, stroke, typeNum }) => {
  let btnType = "";

  if (type === "delete") btnType = "delete-btn";
  else if (type === "heart") btnType = "heart-btn";
  else btnType = "save-btn";

  return (
    <HomePostBtnWrapper>
      <button
        className={`home-post-btn ${btnType}`}
        onClick={onClick}>
        {type === "delete" && <DeleteIcon fill={fill}></DeleteIcon>}
        {type === "heart" && (
          <HeartIcon
            fill={fill}
            stroke={stroke}></HeartIcon>
        )}
        {type === "save" && (
          <SavedPostsIcon
            fill={fill}
            stroke={stroke}></SavedPostsIcon>
        )}
      </button>
      <div>{typeNum}</div>
    </HomePostBtnWrapper>
  );
};

export default HomePostBtn;
