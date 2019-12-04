import * as Login from "./login.js";

const db = firebase.firestore();
const upload = async () => {
  const userInfo = Login.getUser();
  await db
    .collection("Posts")
    .doc()
    .set({
      uid: userInfo.id,
      profileUrl: userInfo.thumbnail_image_url,
      nickname: userInfo.nickname,
      regDttm: new Date().getTime(),
      content: $("textarea").val()
    });
  window.self.close();
};

$("#submit").click(e => {
  e.preventDefault();
  if (
    window.confirm("Are you sure to upload?") &&
    $("textarea").val().length > 0
  ) {
    upload();
  }
});
