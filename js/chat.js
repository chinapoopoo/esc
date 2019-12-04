import * as Login from "./login.js";

const db = firebase.firestore();
const userSub = db.collection("Users").onSnapshot(querySnapshot => {
  querySnapshot.docChanges().forEach(change => {
    if (change.type === "added") {
      const data = change.doc.data();
      $(".party-list").append(
        participant(data["profileUrl"], data["nickname"])
      );
    }
  });
});
const msgSub = db
  .collection("Messages")
  .orderBy("regDttm")
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        const data = change.doc.data();
        let userInfo;
        if (Login.isLoggedIn()) {
          userInfo = Login.getUser();
        } else userInfo = {};

        if (userInfo.id == data["uid"])
          $(".messages").append(
            myMessage(
              data["profileUrl"],
              data["nickname"],
              data["message"],
              convertDttm(data["regDttm"])
            )
          );
        else
          $(".messages").append(
            othersMessage(
              data["profileUrl"],
              data["nickname"],
              data["message"],
              convertDttm(data["regDttm"])
            )
          );
      }
    });
    scrollToEnd();
  });
const convertDttm = dttm => new Date(dttm).toLocaleString();

$(document).ready(() => {
  scrollToEnd();
  $("input").on("keypress", e => {
    if (e.keyCode == 13) {
      if (!Login.isLoggedIn()) {
        alert("You have to login first.");
        Login.login();
        return;
      }
      if ($("input").val().length > 0) {
        userJoin();
        addMessage($("input").val());
        $("input").val("");
      }
    }
  });
});

$(document).unload(() => {
  userSub();
  msgSub();
});

const userJoin = () => {
  const userInfo = Login.getUser();
  db.collection("Users")
    .doc(userInfo.id)
    .set(
      {
        uid: userInfo.id,
        profileUrl: userInfo.thumbnail_image_url,
        nickname: userInfo.nickname
      },
      { merge: true }
    );
};

const addMessage = message => {
  const userInfo = Login.getUser();
  db.collection("Messages")
    .doc()
    .set({
      uid: userInfo.id,
      profileUrl: userInfo.thumbnail_image_url,
      nickname: userInfo.nickname,
      message: message,
      regDttm: new Date().getTime()
    });
};

const participant = (img, name) => `
  <div class="participant">
    <img
      src="${img}"
      alt=""
    />
    <div class="col">
      <div class="name">
        ${name}
      </div>
    </div>
  </div>`;

const scrollToEnd = () => {
  $(".chat-list").animate(
    {
      scrollTop: $(".messages").height()
    },
    700
  );
};

const othersMessage = (img, name, message, dttm) => {
  return `
    <div class="message other">
        <img src="${img}" alt="" />
        <div class="col">
            <div class="name">
                ${name}
            </div>
            <div class="content">
                ${message}
            </div>
            <div class="date">
                ${dttm}
            </div>
        </div>
    </div>
    `;
};

const myMessage = (img, name, message, dttm) => {
  return `
    <div class="mine">
        <div class="col">
            <div class="name">
                ${name}
            </div>
            <div class="content">
                ${message}
            </div>
            <div class="date">
                ${dttm}
            </div>
        </div>
        <img src="${img}" alt="" />
    </div>
    `;
};
