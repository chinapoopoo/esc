import * as Login from "./login.js";

$(document).ready(() => {
  scrollToEnd();
  $("input").on("keyup", e => {
    if (e.keyCode == 13) {
      if (!Login.isLoggedIn()) {
        alert("Please login first");
        Login.login();
        return;
      }
      $(".messages").append(myMessage($("input").val()));
      $("input").val("");
      scrollToEnd();
    }
  });
});

function scrollToEnd() {
  $(".chat-list").animate(
    {
      scrollTop: $(".messages").height()
    },
    700
  );
}

function othersMessage() {
  return `
    <div class="message other">
        <img src="img/a.jpg" alt="" />
        <div class="col">
            <div class="name">
                blue_lim
            </div>
            <div class="content">
                The waves were crashing on the shore; it was a lovely sight.
                The body may perhaps compensates for the loss of a true
                metaphysics. She wrote him a long letter, but he didn't read
                it. Check back tomorrow; I will see if the book has arrived.
                Abstraction is often one floor above you. A song can make or
                ruin a person’s day if they let it get to them. The mysterious
                diary records the voice.
            </div>
            <div class="date">
                2019-11-17 12:00
            </div>
        </div>
    </div>
    `;
}

function myMessage(message) {
  return `
    <div class="mine">
        <div class="col">
            <div class="name">
                blue_lim
            </div>
            <div class="content">
                ${message}
            </div>
            <div class="date">
                2019-11-17 12:00
            </div>
        </div>
        <img src="img/a.jpg" alt="" />
    </div>
    `;
}
