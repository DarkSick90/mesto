
export class UserInfo {
  #userName;
  #userInfo;

constructor (userName, UserInfo) {
    this.#userName = document.querySelector(userName);
    this.#userInfo = document.querySelector(UserInfo);
}

getUserInfo () {
    return {
        name: this.#userName.textContent,
        info: this.#userInfo.textContent,
      };
};

setUserInfo(data) {
    this.#userName.textContent = data.userName;
    this.#userInfo.textContent = data.userJob;
  }

}