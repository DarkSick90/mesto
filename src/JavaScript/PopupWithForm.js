import { PopUp } from "./PopUp.js";

export class PopupWithForm extends PopUp {

  #form;
  #submitHandler;
  #inputs;
  #popUpSelector;

    constructor(popUpSelector, submitHandler) {
      super(popUpSelector);
      this.#popUpSelector = document.querySelector(popUpSelector);
      this.#form = this.#popUpSelector.querySelector('.popup__form');
      this.#submitHandler = submitHandler;
      this.#inputs = this.#form.querySelectorAll('.popup__input');
    }
  
    #getInputValues() {
      const values = {};
      this.#inputs.forEach((input) => {
        values[input.name] = input.value;
      });
      return values;
    }

    open() {
      super.open();
      super.setEventListeners()
    }
  
    setEventListeners() {
      this.#form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.#submitHandler(this.#getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
      this.#form.reset();
    }
  }