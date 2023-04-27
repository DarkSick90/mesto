export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.method = config.method;
  }

  getInitialCards() {
    return fetch(this.url, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  postCards(data) {
    fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((data) => {
      location.reload();
    });
  }

  postUser(data) {
    fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((data) => {
      location.reload();
    });
  }

  postUserAvatar(data) {
    fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((data) => {
      location.reload();
    });
  }

  deleteCard(id) {
    fetch(`${this.url}/${id}`, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({}),
    }).then((data) => {
      location.reload();
    });
  }

  like(id) {
    fetch(`${this.url}/${id}/likes`, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({}),
    }).then((data) => {
      location.reload();
    });
  }
}
