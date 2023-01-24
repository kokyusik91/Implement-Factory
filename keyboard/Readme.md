## 가상 키보드 구현 ⌨️

## 배운것 🔨

### 1. JS로 Class 사용하는 법

- #키워드를 앞에 붙이게되면 class 내부에서 private으로 사용할 수 있다.

### 2. Keyboard Class를 인스턴스화 시킴

- 최초에 인스턴스화 시킬때 `constructor`에서 DOM의 요소들을 가져오는 메서드 `assignElement()`를 실행하고, 이벤트 리스너 함수들을 선언해놓은 `addEvent()`를 실행시켰다.

```js
  constructor() {
    // 인스턴스화 시킬때 메서드들을 실행시킨다.
    this.#assignElement();
    this.#addEvent();
  }
```

DOM 요소들을 미리 가져왔다.

```js
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
```

### 3. 이벤트 핸들러에서 내부 멤버변수를 사용할때 bind메서드로 this 바인딩을 한다.

- 메서드에서 this는 전역 window를 가르키므로 혹시 멤버변수에 접근할때는 this 바인딩을 해준다. 즉 이벤트 핸들러 콜백함수에게 this를 바인딩해줘야한다.

예시)

```js
this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown.bind(this));
document.addEventListener("mouseup", this.#onMouseUp.bind(this));

// 실제 메서드에서 this는 인스턴스화된 객체를 가르키게 된다.
  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }
```

### 4. DOM에 접근할때 꼭 document로 시작할 필요는 없다.

- 보통 우리가 DOM에 접근할때 `document.`으로 접근하는 경우가 많은데 가능하다면, 특정 요소안에서 찾는 게 시간이 더 빠르다.

```js
// 최상단 요소는 document에서 찾고
this.#containerEl = document.getElementById("container");
// 그 하위 요소는 container에서 찾는다.
this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
```

### 5. JS로 font 바꾸기

```js
document.body.style.fontFamily = event.target.value;
```

### 6. JS로 html 특정 커스텀 어트리뷰트 요소에 접근하기

```js
this.#keyboardEl.querySelector(`[data-code=${event.code}]`);
```

### 7. JS toggle 메서드

- toggle 메서드 두번째 인자로 boolean 값 혹은 조건식을 넘기면 true 일때는 class가 부착되고 false일때는 class가 띄어진다.

```js
this.#inputGroupEl.classList.toggle(
  "error",
  /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/.test(event.key)
);
```

### 8. DOM 탐색시 가장 가까운 부모요소를 찾는 방법

- `element.closet('')`을 사용한다. 예를들어 `element.closet('div.key')`이면 가장 가까운 조상의 div태그중에 key라는 class를 가진 요소를 찾아서 반환해준다.

```js
event.target.closest("div.key");
```

### 9. html의 `data-뭐시기`에 접근하는 방법

- `element.dataset.뭐시기` 로 접근하여 값을 가져올 수 있다.

```html
<div class="key" data-code="KeyT" data-val="t">T</div>
```

```js
const val = keyEl?.dataset.val;
```

---

## 추가 웹팩 개발환경 셋팅 ⚙️

### 1. Webpack 개발환경

1. `npm init -y` : package json 초기화
2. `npm i -D webpack wepback-cli webpack-dev-server` : webpack 패키지들 설치
   - -D 옵션은 dev-dependencies : 로컬개발이나 테스트에만 필요한 패키지이다.
   - 옵션을 안주게 되면 production 환경에서 설치할 dependencies 들이다.
3. webpack.config.js

   1. entry 속성은 자바스크립트의 진입점을 나타낸다.
   2. output속성은 build를 했을때 bundle파일 관련속성을 다룰수 있다.
      1. path는 bundle될 파일의 경로를 나타낸다. ( path부분에는 상대경로를 적으면 webpack이 인식을 못하기 때문에, path모듈을 불러와서 webpack이 절대경로를 찾을 수 있도록 setting 해주었다.)
      2. clean속성은 기존 파일을 지우고 새로 생성하는 속성
   3. `devtool: 'source-map'` : build한 파일과 원본파일을 연결해주는 기능을 한다.
   4. `mode : “development” or “production”` : webpack이 build할때 production이면 코드 난독화를 시킨다.
   5. `npm i -D terser-webpack-plugin` : 이건 한번 찾아보자
   6. html과 css관련 모듈들을 설치해 준다.
      1. npm i -D html-webpack-plugin : 이 플러그인을 사용하게 되면 lodash 문법을 사용할 수 있게 된다.

         ```tsx
         plugins: [
             new HtmlWebpackPlugin({
               title: 'keyboard',
               // webpack 파일 기준 상대경로에 위치한 index.html을 사용한다.
               template: './index.html',
               // js파일을 build했을때 bundle.js파일을 body에 넣어줄거냐 head에 넣어줄거냐 설정 가능 (기본적으로 head에 inject된다.)
               inject: 'body',
               favicon: './favicon.ico',
             }),
           ],
         ```

         ```html
         <head>
           <meta charset="UTF-8" />
           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
           <meta
             name="viewport"
             content="width=device-width, initial-scale=1.0"
           />
           <title><%= htmlWebpackPlugin.options.title %></title>
         </head>
         ```

      2. css-loader
      3. css-minimizer-webpack-plugin : CSS 사이즈를 압축하기 위한 플러그인
      4. mini-css-extract-plugin : html에 CSS를 붙여넣기 위해서 사용하는 플러그인
   7. 따로 스크립트에 development인지, production인지 mode를 적어주지 않으면 development환경에서 build가 진행된다 → 코드의 난독화가 진행되지 않는다.

      ```json
      scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "build": "webpack --mode=production"
        },
      ```

      <aside>
      💡 production 환경에서의 build는 컴팩트하게 최적화 시켜준다. (줄바꿈 제거 등등)

      </aside>

   8. webpack-dev-sever

   ```jsx
   devServer: {
       host: 'localhost',
       port: '8080',
       open: true,
   		// index.html 변화가 있을때마다 리로드 시켜준다.
       watchFiles: 'index.html',
     },
   ```

   - watchFiles는 처음 알게된 속성이다! html파일이 바뀔때마다 리로드 된다.

   ### 2. Eslint와 Prettier 설정

   1. Eslint : 자바스크립트 린터중 하나로, 코드를 실행하지 않아도 문법적 에러를 잡아준다.
   2. Prettier :

   3. `npm i -D eslint`
   4. `npm i -D prettier —-save-exact` : ^표시가 없이 설치가 되고, 이것은 npm i를 했을시 최신버전으로 업데이트 안하겠다 라는 것을 의미한다.
      1. prettier는 정확한 버전을 설치하기 위해서 —save-exact 옵션을 붙여 설치하였다.
   5. `npm i -D eslint-config-prettier eslint-plugin-prettier`
      - `eslint-config-prettier` 는 eslint와 prettier의 코드 포맷팅이 겹치는 부분을 없애주는 기능을한다.
      - `eslint-plugin-prettier` 는 eslint에 prettier에 코드 포맷팅을 추가하는 역할
   6. `npx eslint —init` : eslint 설정파일을 초기화 할수 있게 해준다.

      ![스크린샷 2023-01-23 오후 2.45.59.png](%E1%84%8F%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%20a9f9902980034c54ab9bcc7dae4aec6e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-01-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.45.59.png)

      - 이렇게 설정하고 나면 `.eslintrc.json`

      ```jsx
      {
        "env": {
          "browser": true,
          "es2021": true
        },
        "extends": ["eslint:recommended", **"plugin:prettier/recommend"**],
        "parserOptions": {
          "ecmaVersion": "latest",
          "sourceType": "module"
        },
        "rules": {}
      }
      ```

      - eslint 설정파일에 prettier 포맷팅 플러그인을 추가해준다.
      - 만약에 airbnb룰을 사용하고 싶다면? → extends부분에다가 `“eslint-config-airbnb”`를 넣어주면된다.

   7. `eslintIgnore` 파일을 만든다.

      1. eslint를 적용하고 싶지 않은 경로나 파일들을 설정할 수 있다 like gitIgnore

      ```jsx
      // eslintIgnore
      /node_modules
      /dist
      /webpack.config.js
      ```

   8. `prettier.json`파일을 만든다. → prettier 설정파일
