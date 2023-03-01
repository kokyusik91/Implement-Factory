# 복잡한 앱에 prefetching 적용

### 사람들이 treatments 페이지를 자주 들어간다는 조사결과가 나왔고, 홈페이지가 처음 시작했을때 treatments 페이지는 prefetch해와서 사람들이 treatments페이지에 들어갔을때 로딩없이 바로 보여주고 싶다.

- 하지만 prefetch로 불러온 데이터의 캐시타임은 5분인데, 5분이내에 사용자가 treatments 페이지에 들어가지 않는다면…가비지 컬렉터가 캐시 데이터를 수거해간다.
- 메인페이지 컴포넌트에서 usePrefetchTreatments를 실행할 것이다.
- 그렇게 되면 데이터가 캐시에 미리 로드되고, 캐시 타임이 다되기 전에 사용자가 Treatments페이지로 이동하면, 캐시된 데이터를 표시할 수 있다.
- 그럴게 되면 사용자는 서버 호출을 할 때까지 기다릴 필요가 없다.
- 유저가 treatments페이지에 들어갔을때는 프리패칭한 시간 기점으로 캐시타임 이내에 들어갔을때 treatments데이터가 캐시에서 로드 된다. 뿐만 아니라 useQuery는 새로운 데이터를 가져온다. 왜? 컴포넌트를 마운트하여 리페칭을 트리거 했기때문에…(데이터가 stale 되었다는 것을 안다)
- 리패칭하고있을때는 캐시된 데이터를 보여준다.

- 캐시타임 지나서 treatments 페이지에 들어갔다면???? 이미 가비지 컬렉터가 캐시데이터를 삭제했고, useQuery를 통해 새로 데이터를 가져오게 된다.

```jsx
// useTretments.ts

export function usePrefetchTreatments(): void {
  const querClient = useQueryClient()
  querClient.prefetchQuery(queryKeys.treatments, getTreatments)
}
```

prefetch할 hook을 미리 선언해놓는다. `useQueryClient` 를 import 해와서 사용한다.

이제 Home 컴포넌트에서 이 prefetch Hook을 불러온다.

```jsx
export function Home(): ReactElement {
  usePrefetchTreatments();

  return (
    <Stack align="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
```

일단 Home컴포넌트에서 prefetch 하기로 결정한 이유는 일단 Home 컴포넌트는 리렌더링이 발생하지 않기때문에 저 usePrefetchTreatments Hook이 여러번 호출 되지 않을것이다.

useEffect안에서 커스텀 훅은 실행 안되니 주의.

staleTime과 cacheTime으로 여러번 호출 되는 것을 막자.
