export const getPerfectThrees = (postsInfo) => {
  let modPostsInfo = [];
  let leftoverStartInd = 0;

  for (let i = 0; i < postsInfo.length / 3; i++) {
    modPostsInfo.push(postsInfo.slice(i * 3, i * 3 + 3));
    leftoverStartInd = i * 3 + 3;
  }

  if (leftoverStartInd < postsInfo.length) modPostsInfo.push(postsInfo.slice(leftoverStartInd));

  return modPostsInfo;
};
