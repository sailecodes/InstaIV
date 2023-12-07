import HomePostInteractBtnsWrapper from "../../../assets/styles/pages/dashboard/HomePostInteractBtnsWrapper";
import HomePostBtn from "./HomePostBtn";

const HomePostInteractBtns = ({ id, updatePostLikes, likesInfo, updatePostSaves, savesInfo }) => {
  return (
    <HomePostInteractBtnsWrapper>
      <HomePostBtn
        type="heart"
        onClick={() =>
          updatePostLikes.mutate({
            statFlag: !likesInfo.users[localStorage.getItem("userId")],
            id: id,
          })
        }
        fill={likesInfo.users[localStorage.getItem("userId")] ? "var(--color-red)" : ""}
        stroke="var(--color-red)"
        typeNum={likesInfo.num}
      />
      <HomePostBtn
        type="save"
        onClick={() =>
          updatePostSaves.mutate({
            statFlag: !savesInfo.users[localStorage.getItem("userId")],
            id: id,
          })
        }
        fill={savesInfo.users[localStorage.getItem("userId")] ? "var(--color-yellow)" : ""}
        stroke="var(--color-yellow)"
        typeNum={savesInfo.num}
      />
    </HomePostInteractBtnsWrapper>
  );
};
export default HomePostInteractBtns;
