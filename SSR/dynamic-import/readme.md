# Dynamic Import

[Advanced Features: Dynamic Import | Next.js](https://nextjs.org/docs/advanced-features/dynamic-import)

### Dynamic import

- 컴포넌트를 사용하는 시점에 불러오는 것.
- Next.js의 Image 컴포넌트, Link 컴포넌트등이 Lazy-load 해온다.
- 커스텀 컴포넌트들도 그게 가능하다.

- next/dynamic은 React.lazy그리고 Suspense의 합성 익스텐션이고, Suspense 바운더리가 성공되기전가지 hydration을 딜레이 할 수 있다.

### SSR 환경에서는 load하고 싶지 않다면?

- 클라이언트 사이드에서만 컴포넌트를 동적으로 로드하기 위해서, 서버사이드렌더링을 비활성화하는 ssr option을 사용할 수 있다.
- 외부 디펜던시나 컴포넌트가 window와 같은 브라우저 API에 의존한다면 유용하게 사용할 수 있다.

```jsx
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/header'), {
  ssr: false,
})
```

### 내가 만든 컴포넌트를 dynamic Import로 동적으로 가져온다면

```jsx
const Button = dynamic(() => import('../../components/Button'), {
  loading: () => <div>Loading.....</div>,
})

return (
  <>
    <h1>다이나믹 임포트</h1>
    <Button>This is Button</Button>
  </>
)
```

- network Tab을 확인해보면 JS부분을 확인했을때 `Component Button`이 따로 `build`되어 가져온다.

![스크린샷 2023-03-10 오후 1.52.42.png](Dynamic%20Import%20d38e9ece7edf4a089706dbb282fbed0f/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-10_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.52.42.png)

- 다이나믹 임포트를 안하면 Chunk 파일에 물려있다.

### Automatic Static Optimization

- page 컴포넌트안에 `getServerSideProps`가 있다면 해당 페이지는 빌드할때 .js 파일로 빌드 된다.
- 없다면?? 그냥 .html파일로 빌드된다.

<aside>
💡 신기함!

</aside>

### Router의 query

- router.query의 값이 Client Side 페이지의 경우, 처음에는 undefined이다.
- Client Side 페이지는 `getServerSideProps`가 없어야한다!!!
- **hydration 이후에 query의 값이 들어온다…** ⇒ 공지사항 페이지가 그래서 /undefined로 요청이감…

```jsx
const router = useRouter()

useEffect(() => {
  console.log(router.query)
}, [router.query])
```

- query 값을 주었는데도 처음 console.log에 찍히는 것은 빈 객체이다…
- 이유 : hydration (사용자와 인터렉션 하기전…) 전까지는 query가 없는 것으로 나온다.

![스크린샷 2023-03-10 오후 2.02.59.png](Dynamic%20Import%20d38e9ece7edf4a089706dbb282fbed0f/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-10_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.02.59.png)

<aside>
💡 useEffect로 쿼리가 주입되고 실행 시킨다.

</aside>

### Static export ⇒ 이건 한번 다시 봐야 할듯 Udemy강의에도 나옴.

### 정리

1. Dynamic Import : Lazy Load로 처음부터 모든 컴포넌트를 import 하는게 아니라 쪼개서 Import 할 수 있다. 한번에 Page에서 모든 컴포넌트를 로드하는 것이아니라 초기에 유의미한 컴포넌트만 import 해서 초기 로딩 속도를 줄일 수 있다.
2. Suspense : Promise가 resolve 되어야 렌더된다.
3. Automatic Static Optimize : 알아서 정적 파일과 동적 파일을 구분해준다. 기준 : 해당 페이지에getServerSideProps와 getInitialProps가 있으면 .js파일로 build가 되고 없다면 .html파일로 빌드된다.
   - request마다 요청에 응답해야되기때문에(pre-render 되어야하기 때문에) 그 파일은 .js파일로 만들어진다. 나머지는 html파일
