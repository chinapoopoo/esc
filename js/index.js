import * as Login from "./login.js";

const db = firebase.firestore();
const getPost = () => {
  $(".panel-body").empty();
  db.collection("Posts")
    .orderBy("regDttm", "desc")
    .limit(5)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data();
        $(".panel-body").append(
          popularContent(
            data.profileUrl,
            data.nickname,
            data.content,
            data.regDttm
          )
        );
      });
    });
};
const convertDttm = dttm => new Date(dttm).toLocaleString();

$(document).ready(() => {
  getPost();
});

$("#add-post-btn").click(e => {
  e.preventDefault();
  if (Login.isLoggedIn()) {
    let popup = window.open("../esc/upload.html", "a", "width=400, height=500");
    var popupTick = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupTick);
        getPost();
      }
    }, 500);

    return false;
  } else {
    alert("You have to login first.");
    Login.login();
  }
});

const popularContent = (img, name, content, dttm) => {
  return `
    <div class="media">
        <a class="media-left" href="#">
        <img style="width:48px;height:48px" src="${img}" alt="" />
        </a>
        <div class="media-body">
        <h4 class="media-heading">${name}</h4>
        <span>${convertDttm(dttm)}</span>
        <p>${content}</p>
        </div>
    </div>
    `;
};
