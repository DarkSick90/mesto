export class Section {
  #renderer;
  #cardsContainer;

  constructor({ renderer }, cardsContainer) {
    this.#renderer = renderer;
    this.#cardsContainer = document.querySelector(cardsContainer);
  }

  renderItems(items, id) {
    items.reverse().forEach((item) => {
      const element = this.#renderer(item, id);
      this.addItem(element);
    });
  }

  setItems(items) {
    this.items = items;
  }

  addItem(domElement) {
    this.#cardsContainer.prepend(domElement);
  }
}
