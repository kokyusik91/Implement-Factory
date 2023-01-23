export class Keyboard {
  #switchEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchEl = document.getElementById("switch");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", (e) => {
      document.documentElement.setAttribute(
        "theme",
        e.target.checked ? "dark-mode" : ""
      );
      console.log(e.target.checked);
    });
  }
}
