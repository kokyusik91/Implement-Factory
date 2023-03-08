# Hydrate

### Hydrate??

- `Hydrate`란, Server Side단에서 렌더링 된 정적 페이지와 번들링된 js파일(Webpack)을 클라이언트에게 보낸 뒤, 클라이언트 단에서 HTML코드와 React인 JS 코드를 서로 매칭 시키는 과정을 말한다.

### 일단 CSR 방식

- React에서는 JS 파일만을 이용하여 `public/index.html`의 기본 뼈대만있는 내용을 제외하고는 `src/index.js` 의 자바스크립트 코드에서 모든 화면을 렌더링 한뒤, HTML DOM 요소 중 root라는 엘리먼트를 찾아 하위로 주입을 하여 웹 화면이 구성합니다.

![이게 index.html 파일 소스](Hydrate%20b11f7bc3d4f6454ca94ec05631f6d12c/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-08_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.03.22.png)

이게 index.html 파일 소스

### Next.js 케이스

- 기본 React와는 다르게 Next.js에서는 클라이언트에게 웹 페이지를 보내기 전에 Server Side 단에서 미리 웹페이지를 `Pre-Rendering` 한다.
- `Pre-Rendering`을 하면 HTML Document가 생성되고, **이 파일을 클라이언트에게 전송한다.**

1. 이후 과정
   1. 이때 클라이언트가 받은 웹페이지는 단순한 웹 화면만 보여주는 **정적 HTML**일 뿐이고 _자바스크립트 요소는 하나도 없는 상태이다._

      <aside>
      💡 화면을 보여주고 있긴 하지만?, **특정 JS 모듈 뿐만 아니라 단순 클릭과 같은 이벤트 리스너들도 각 웹사이트의 DOM 요소에 적용되어 있지 않은 상태**를 말한다.

      </aside>

   2. 차이점
      1. 순수 React.js : HTML과 JS파일을 한꺼번에 보내고 클라이언트가 JS 코드를 통해 웹 화면을 렌더링
      2. Next.js : Pre-Rendering된 웹 페이지를 클라이언트에게 먼저 보내고, React가 번들링된 자바스크립트 코드들을 클라이언트에게 전송함.

![Untitled](Hydrate%20b11f7bc3d4f6454ca94ec05631f6d12c/Untitled.png)

- 실제로 Next.js로 제작된 웹페이지를 방문하게 되면, 맨 처음 `document` 타입의 파일을 전송받고, 그 이후에 렌더링된 `React.js` 파일들이 **Chunk 단위**로 다운로드 되는 것을 확인 할 수 있다.
- 위의 리액트 코드들이 이전에 보내진 HTML DOM 요소 위에 한번 더 렌더링을 하게되는데 이 과정을 `Hydrate` 라고 한다.

<aside>
💡 Hydrate는 이미 pre-render된 HTML페이지위에 JS코드들이 한번 더 렌더링되면서 인터렉티브한 요소들이 추가되는 과정이라고 할 수 있다.

</aside>

## Hydrate의 장점

- 순수 리액트와는 다르게 `Pre-Rendering`된 Document는 자바스크립트 요소가 빠진 가벼운 상태이기 때문에 클라이언트 측에서 빠르게 로딩이 가능한 장점이 있다. (처음에 유효한 정보들을 사용자들에게 보여줄 수 있다.)
- 이후 Chunk단위로 다운로드된 자바스크립트 요소들이 렌더링될때는
  - document의 DOM 요소에 자바스크립트 속성이 매칭 되는 것이기 때문에 웹 페이지를 다시 그리는 과정은 일어나지 않는다.
- Hydrate는 Next.js에서만 일어나는 과정이 아니고, 사실 `ReactDOM`의 함수이다.
  ```jsx
  ReactDOM.render(element, container, [callback])
  ReactDOM.hydrate(element, container, [callback])
  ```
  - `render()` 함수가 특정 컴포넌트를 지정된 DOM 요소의 하위로 주입해 `렌더링을` 처리해준다면
  - `hydrate()` 함수는 특정 컴포넌트를 지정된 DOM 요소에 하위로 `hydrate처리`를 한다고 있으면된다.
    <aside>
    💡 DOM Tree에 해당되는 DOM 요소를 찾아 자바스크립트 속성(이벤트 리스너)들을 부착하는 일을 말한다.
    
    </aside>
