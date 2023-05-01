export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  #getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => this.#getResponseData(res));
  }

  postCards(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this.#getResponseData(res));
  }

  postUser(data) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this.#getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then((res) => this.#getResponseData(res));
  }

  postUserAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this.#getResponseData(res));
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({}),
    }).then((res) => this.#getResponseData(res));
  }

  like(id, method) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify({}),
    }).then((res) => this.#getResponseData(res));
  }
}
