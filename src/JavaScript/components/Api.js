export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  postCards(data, method) {
    return fetch(`${this.url}/cards`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  postUser(data, method) {
    return fetch(`${this.url}/users/me`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  getUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  postUserAvatar(data, method) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  deleteCard(id, method) {
    return fetch(`${this.url}/cards/${id}`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  like(id, method) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }
}
