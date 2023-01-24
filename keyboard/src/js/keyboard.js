export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");

    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);

    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);

    document.addEventListener("keydown", this.#onKeyDown.bind(this));

    document.addEventListener("keyup", this.#onKeyUp.bind(this));

    this.#inputEl.addEventListener("input", this.#onInput);
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }

  #onKeyUp(event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    if (this.#keyboardEl.querySelector(`[data-code=${event.code}]`)) {
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active");
    }
  }

  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    // toggle 우측값이 true면 error class를 붙이고 false면 error class를 뺀다.
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/.test(event.key)
    );
    // data-code값이 없으면, 이벤트 핸들러 붙여주지 않음...
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(
      /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/,
      ""
    );
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }
  // mouse땔때 .active가 있으면 그 class를 제거
  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    // input이 입력되도록
    const keyEl = event.target.closest("div.key");
    const val = keyEl?.dataset.val;
    const isActive = !!keyEl?.classList.contains("active");
    // 일반 key인 경우
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
}
