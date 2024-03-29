import * as Login from "./login.js";

const kakaoScript =
  '<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>';
const getActiveIndex = () => {
  const path = window.location.pathname.replace("/esc", "");
  let index = -1;

  if (path == "/" || path == "/index.html") {
    index = 0;
  } else if (path == "/chat.html") {
    index = 1;
  } else if (path == "/hours.html") {
    index = 2;
  } else if (path == "/meal.html") {
    index = 3;
  } else if (path == "/translation.html") {
    index = 4;
  }

  return index;
};
const isActive = index => (getActiveIndex() == index ? "class='active'" : "");
const mkLoginBtn = () =>
  Login.isLoggedIn()
    ? '<li role="presentation" id="logout-btn"><a>Logout</a></li>'
    : '<li role="presentation" id="login-btn"><a>Login</a></li>';

$(document).ready(() => {
  $("head").append(kakaoScript);
  $("body").prepend(headerContent());
  $("body").append("<br /><br /><br />");
  $("body").append(footerContent());
  $("#logout-btn").click(e => {
    e.preventDefault();
    Login.logout();
  });
  $("#login-btn").click(e => {
    e.preventDefault();
    Login.login();
  });
  [
    popularContent(),
    popularContent(),
    popularContent(),
    popularContent()
  ].map(content => $(".panel-default").append(content));
});

function headerContent() {
  return `
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button
                    type="button"
                    class="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.collapse"
                >
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html"><span>ESCommunity</span></a>
            </div>
            <div class="navbar-collapse collapse">
                <div class="menu">
                    <ul class="nav nav-tabs" role="tablist">
                        <li ${isActive(
                          0
                        )} role="presentation"><a href="index.html">Home</a></li>
                        <li ${isActive(
                          1
                        )} role="presentation"><a href="chat.html">Chat</a></li>
                        <li ${isActive(
                          2
                        )} role="presentation"><a href="hours.html">Operating Hours</a></li>
                        <li ${isActive(
                          3
                        )} role="presentation"><a href="meal.html">Meal</a></li>
                        <li ${isActive(
                          4
                        )} role="presentation"><a href="translation.html">Translation</a></li>
                        ${mkLoginBtn()}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="blogs">
            <hr />
          </div>
        </div>
      </div>
    </div>
    `;
}

function footerContent() {
  return `
    <footer>
        <div class="last-div">
            <div class="container">
            <div class="row">
                <div class="copyright">
                © 2014 eNno Multi-purpose theme |
                <a target="_blank" href="http://bootstraptaste.com"
                    >Bootstraptaste</a
                >
                </div>
            </div>
            </div>
            <a href="" class="scrollup"><i class="fa fa-chevron-up"></i></a>
        </div>
    </footer>
    `;
}

function popularContent() {
  return `
    <div class="panel-body">
        <div class="media">
            <a class="media-left" href="#">
                <img src="img/a.jpg" alt="" />
            </a>
            <div class="media-body">
                <h4 class="media-heading">Student 1</h4>
                    <p>
                        He told us a very exciting adventure story.
                        Two seats were vacant.
                        I would have gotten the promotion, but my attendance wasn’t good enough.
                    </p>
                <div class="ficon">
                    <a href="#" alt="">Read more</a>
                </div>
            </div>
        </div>
    </div>
    `;
}
