## Date-picker 만들기!

<br>

### 사용한 기술

- snowpack : webpack처럼 build를 할 수 있고, devServer 지원하여 개발가능
- Sass : css에서 지원하지 않는 문법을 사용할 수 있고, css보다 조금 더 전략적으로 스타일을 작성 할 수 있음

<br>

### Snowpack 설정 (`snowpack.config.js`)

```js
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  optimize: {
    minify: true,
  },
  plugins: ['@snowpack/plugin-sass'],
}
```

webpack보다 조금 더 단순한다. 추가로 Sass를 css로 컴파일 해주는 Plugin을 설치해야함.

<br>

### 구현 내용 및 주요 메서드,

1. Constructor

```js
 constructor() {
    this.initCalendarDate()
    this.initSelectedDate()
    this.#assignElement()
    this.setDateInput()
    this.addEvent()
  }
```

2. `assignElement()` : 돔 요소 선택 후 할당

3. `moveToNextMonth()` : 다음달로 이동 관련 메서드

4. `setDateInput()` : 데이터 Input
