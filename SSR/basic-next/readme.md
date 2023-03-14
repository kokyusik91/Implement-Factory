# Next.js 기본 기능

- create next app 으로 next프로젝트 실행
- 많은 대형사이트들에서도 `Next.js` 를 쓰고 있다.
- pages폴더 구조 ⇒ URL과 매칭되었다.
- 페이지를 그리는 방식 ⇒ 데이터를 가져와서 그린다.
- 페이지를 그리는 방식 총 4가지 종류 : SSR / CSR / SSG / ISR
- SSG는 build타임에 측정했던 time이 그대로 들어감.
- ISR 특정 주기마다
- SSG는 개발환경에서는 SSR처럼 동작한다.

<aside>
💡 이상적인 것은 SSG와 ISR의 조합

</aside>

### Pre-render

- 모든 페이지를 Pre-render한다.
- 이미 많은 부분이 그려져있는 상태로 HTML이 그려져있다.
- 하지만 Pre-render는 JS 요소들은 제외하고 순수 HTML만 그려진 상태이다.

### SEO 와 Pre-render의 상관관계

- 검색엔진에게 내 페이지를 조금 더 잘 보여주게 하는 것
- 순수 REACT인 CSR만 제공한다면, Client 처럼 동작하지 않는 검색엔진의 경우, 아무런 데이터도 조회해 갈 수 없다.

![스크린샷 2023-03-09 오후 1.21.24.png](Next%20js%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%203a15c5edc27241b28d9e61957f3fc3cd/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-09_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.21.24.png)

- 하지만 SSR을 하게 되면 검색엔진이 이미 HTML 구조들을 볼 수 있다.

### Next.js의 Pre-render 방식

1. SSG : 빌드 타임에 Pre-render **(추천)**
2. SSR : 요청 타임에 Pre-render. 예) 사용자나, 검색엔진이 해당 URL로 요청을 보냈을때 Pre-render 진행

### SSG 의 2가지 상황

1. Page의 내용물이 외부 데이터(API Server에서 데이터를 받아와야하는 상황)에 의존적인 상황.
   1. `getStaticProps` 만 가지고 가능
2. Page Paths까지 외부 데이터에 의존적인 상황.
   1. slug 동적인 파라미터로 외부 데이터 끌어오기
   2. `getStaticPaths` 도 함께 활용해야 가능

### ✨✨✨✨✨ **Sub Layout 참고하기** ✨✨✨✨✨

- **세입자앱에 GNB를 처리할 수 있을 듯!? ⇒ 리팩토링 페이지마다 hideGNB useEffect를 빼도 될듯!?**

### Next.js의 Image 컴포넌트

- 스크롤이 뷰포트에 위치 했을때 이미지가 보여지는 lazy-loading을 기본 제공
- 그 중에서도 처음에는 Blur 처리가 되었다가, 뷰포트일때 사진이 보여지는 효과를 제공한다.
- 추가로 Image 컴포넌트에 responsive 프로퍼티를 주게 되면, 뷰포트에따라 뷰포트가 작을때는 이미지 사이즈가 작고, 뷰포트가 넓을때는 이미지 사이즈가 조금 큰 이미지를 다운로드 받는다. ( 사이즈에 따라 다른 이미지 사이즈를 제공받는다. )
  - ex) 모바일 환경에서는 작은 사이즈의 이미지를 받아서, 사용자의 부하를 막고 더 나은 사용자 경험을 제공

<aside>
💡 이미지 컴포넌트를 제공하는 이유 : Next.js에서는 개발자들, 디자이너들이 최적화된 서비스를 제공하도록 돕고 싶다. 이미지의 문제들을 최적화된 Solution을 제공하려고 했다.

</aside>

### Pages 폴더구조 테스트

![스크린샷 2023-03-09 오후 1.50.36.png](Next%20js%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%203a15c5edc27241b28d9e61957f3fc3cd/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-09_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.50.36.png)

### Dynamic Routes

- 우리의 목적은 [slug] 값에 따라서 다른 화면을 보여주고 싶은것인데…
- 그렇다면 slug값을 어떻게 추출 할 수 있을까?!

```jsx
import {useRouter} = from 'next/router'

const router = useRouter();
const { slug } = router.query
```

<aside>
💡 [slug].js 파일 하나만 가지고 다양한 페이지를 대응 할 수 있게 된다.

</aside>

- url이 localhost:3000/category/sports?from=event&age=123

```jsx
const router = useRouter()
const { slug, from, age } = router.query

console.log(slug) // sports
console.log(from) // event
console.log(age) // 123
```

```jsx
//pages/[username]/[info].js

// url:localhost:3000/jimmy/height

const router = useRouter()
const { username, info } = router.query

console.log(username) // jimmy
console.log(info) // height
```

- 근데 이걸 어디다 쓰지?!!?

### ✨✨✨✨✨ Shallow Routing ✨✨✨✨✨

- 로컬 상태는 안바꾸고, data-fetching 안일어나게 하고, url만 바꾸고 싶음. {shallow : true} 옵션추가

```jsx
router.push(url, undefined, { shallow: true })
```

- { shallow : true } 를 주게 되면 `getServerSideProps` 함수도 호출되지 않는다.

### ✨✨✨✨✨ 클릭했을때 query붙이고 url 변경 케이스 ✨✨✨✨✨

1. location.replace(’settings/my/info?status=editing’)
   1. 로컬 상태 초기화 (리 렌더링 발생)
   2. **getServerSideProps 호출**
2. router.push(’settings/my/info?status=editing’)
   1. 로컬 상태 유지
   2. **getServerSideProps 호출 == data fetching 일어남**
3. router.push(’settings/my/info?status=editing’, undefined, {shallow : true})
   1. 로컬 상태 유지.
   2. **getServerSideProps 호출 안함.**
   3. 아무것도 안바뀌고 url만 바뀐다.

<aside>
💡 이거 모달열릴때 써도 되겠는데?!?! 모달 열리고 뒤로가기 했을때 닫히도록

</aside>

<aside>
💡 대신 동일한 url에 쿼리만 바뀌도록 했을때만 url만바뀌고 상태들은 유지 === Modal 다룰때 유용할때

</aside>
