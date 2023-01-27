export default class ImageSlider {
  // 얘는 살짝 index같은 느낌임...
  #currentPosition = 0;

  #sildeNumber = 0;

  #sildeWidth = 0;

  #intervalId;

  #isAutoPlay = true;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  previousBtnEl;

  indicatorWrapEl;

  controlEl;

  // constructor 내부의 함수 실행도 유의한다.
  constructor() {
    console.log('컨스트럭터 실행!');
    console.log(this.sliderListEl);
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoPlay();
  }

  // 먼저 탐색을 해야한다. 최초로 실행되어야함.
  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  // 슬라이더 넘버 초기화
  initSliderNumber() {
    this.#sildeNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#sildeWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#sildeNumber * this.#sildeWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlEl.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#isAutoPlay = true;
      this.controlEl.classList.add('play');
      this.controlEl.classList.remove('pause');
      this.initAutoPlay();
    } else if (event.target.dataset.status === 'pause') {
      this.#isAutoPlay = false;
      this.controlEl.classList.remove('play');
      this.controlEl.classList.add('pause');
      clearInterval(this.#intervalId);
    }
  }

  moveToRight() {
    // 한칸 오른쪽으로 가게되면 1씩 증가
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#sildeNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#sildeWidth * this.#currentPosition
    }px`;
    if (this.#isAutoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }

    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#sildeNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#sildeWidth * this.#currentPosition
    }px`;
    if (this.#isAutoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator() {
    // docFragment는 렌더되지 않고 여러가지 요소들을 넣을 수 있다.
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#sildeNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }

    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#sildeWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
  }
}
