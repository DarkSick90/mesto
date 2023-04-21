export class Section {
  #items;
  #renderer;
  #cardsContainer;

  constructor({ items, renderer }, cardsContainer) {
    this.#items = items;
    this.#renderer = renderer;
    this.#cardsContainer = document.querySelector(cardsContainer);
  }

  renderItems() {
    this.#items.forEach((item) => {
      const element = this.#renderer(item);
      this.addItem(element);
    });
  }

  addItem(domElement) {
    this.#cardsContainer.prepend(domElement);
  }
}
