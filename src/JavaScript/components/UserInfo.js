export class UserInfo {
  #userName;
  #userInfo;
  #avatar;

  constructor(userName, UserInfo, avatar) {
    this.#userName = document.querySelector(userName);
    this.#userInfo = document.querySelector(UserInfo);
    this.#avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this.#userName.textContent,
      info: this.#userInfo.textContent,
      avatar: this.#avatar.textContent,
    };
  }

  setUserInfo(data) {
    this.#userName.textContent = data.name;
    this.#userInfo.textContent = data.about;
    this.#avatar.src = data.avatar;
  }
}
