export const isLoggedIn = () => localStorage.getItem("id") != null;

export function login() {
  if (!Kakao.isInitialized()) Kakao.init("f07bb729df8eeca982ea2d27647fde64");
  Kakao.Auth.login({
    success: authObj => {
      Kakao.API.request({
        url: "/v2/user/me",
        success: res => {
          const accountInfo = res.kakao_account.profile;
          alert(`Welcome ${accountInfo.nickname}!`);
          setUserInfo(
            res.id,
            accountInfo.nickname,
            accountInfo.profile_image_url,
            accountInfo.thumbnail_image_url
          );
          location.reload();
        },
        fail: error => {
          console.log(error);
        }
      });
    },
    fail: err => {
      console.log(err);
    }
  });
}

export function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    localStorage.removeItem("profile_image_url");
    localStorage.removeItem("thumbnail_image_url");
    location.reload();
  }
}

export function getUser() {
  if (!isLoggedIn()) {
    alert("You have to login first.");
    login();
  } else
    return {
      id: localStorage.getItem("id"),
      nickname: localStorage.getItem("nickname"),
      profile_image_url: localStorage.getItem("profile_image_url"),
      thumbnail_image_url: localStorage.getItem("thumbnail_image_url")
    };
}

export function setUserInfo(
  id,
  nickname,
  profile_image_url,
  thumbnail_image_url
) {
  localStorage.setItem("id", id);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("profile_image_url", profile_image_url);
  localStorage.setItem("thumbnail_image_url", thumbnail_image_url);
}
