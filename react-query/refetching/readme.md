# Re-fetching

- 리패칭을 알기 위해서 서버가 만료 데이터를 업데이트 한다
- 우리들의 의지와 상관없이 일정 시간이 지나면 서버가 만료된 데이터를 삭제하는데
  - 이런 종류의 리페칭은 페이지를 벗어났다가 다시 돌아왔을 때 볼 수 있다.
    <aside>
    💡 다른 브라우저 페이지를 갔다가 현재 보고 있는 페이지로 포커스를 하게되면 만료되었던 데이터를 re-fetching 한다 ⇒ stale time이 0이기 때문에 서버에서 받아온 데이터는 그 즉시 stale 상태가 된다.
    
    </aside>
    
    1. 쿼리가 새로 인스턴스화 되었을때
    2. useQuery 호출이 있는 리액트 컴포넌트가 마운트 될때마다
    3. window refcused
    4. network is reconnected
    5. `refetchInterval` has expired : 리페치 인터벌이 만료되었을때
        1. 자동 폴링


### 어떻게 리페칭 하는데?

- 전역에서 리페칭 옵션을 설정 할 수 있다.
- 특정 useQuery에서도 리페칭 옵션을 설정 할 수 있다.
- 종류
  - refetchOnMount : `boolean` = 기본값 true
  - refetchOnWindowFocus : `boolean` = 기본값 true
  - refetchOnReconnect : `boolean` = 기본값 true
  - refetchInterval : 밀리초 단위의 시간
- refetching을 명령으로 우리가 진행하고 싶을때도 처리할 수 있다.
  - useQuery의 반환 객체의 프로퍼티중 하나인 `refetch` 사용

<aside>
💡 React Query는 refetch에 꽤 강한 프로그래밍이다.

</aside>

### 리페칭을 제한 하는 법 (suppressing)

1. Increase stale time : 기본값인 0 에서 stale time을 늘려서 해결 할수 있다.
   - 위의 refetchOnMount, refetchOnWindowFocus, refetchOnReconnect는 데이터가 실제로 만료된 경우에만 작동을 한다. (stale time이 지나고…….)
2. refetchOnMount, refetchOnWindowFocus, refetchOnReconnect 옵션을 false로 지정한다.
3. re-fetch 할때는 주의를 기울여야한다.

   1. **기본적으로 변동이 잦지 않은 데이터에 적용해야한다.**
   2. 미세한 변동에도 큰 변화를 불러오는 데이터에는 적용하지 말아야한다.

   ex) 서비스와 직원 정보는 자주 변하지 않기 때문에 리페칭을 제한해도 된다.

   ex) 반면에 실시간정보가 중요한 예약은 사용자에게 훨씬 중요한 데이터이다.

   <aside>
   💡 리페칭을 제한하면 네트워크 호출을 줄 일 수 있다.

   </aside>

### 예시) stale Time 증가

- staletime을 10분으로 지정해서 10분동안에는 데이터가 신선한 상태를 유지 시킨다.
- cacheTime이 staleTime보다 길어야한다. 왜? staleTIme이 지나면 refetching이 일어나서, cache-data를 보여줘야하는데.. 그럼 cacheTime > staleTime 보다 길어야한다.

<aside>
💡 `staleTime`이 `cacheTime`보다 크면? 캐시가 쓸모 없어지게 된다.

</aside>

```tsx
export function useTreatments(): Treatment[] {
  // TODO: get data from server via useQuery
  const toast = useCustomToast();
  const fallback = [];
  const { data = fallback } = useQuery(
    [queryKeys.treatments],
    getTreatments,
    {
      staleTime: 60000, // 10munutes
      cacheTime: 90000, // 15minutes (doesn't make sense for staleTime to exceed cacheTime)
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  return data;
}
```

- 이렇게 설정을 해두면 적극적으로 데이터를 불러 오지 못한다.

![스크린샷 2023-02-19 오후 1.25.53.png](Re-fetching%2096ef5a9b721c4f7fae3e65c43de8ad55/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-02-19_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.25.53.png)

- treatments는 다른 창에 갔다가 현재 페이지로 포커스가 일어나도 refetching이 일어나지 않는다.
- staff는 다른 창에 갔다가 현재 페이지로 포커스가 일어나면 자동으로 refetching이 일어나서 업데이트 시간이 변경 되었다.

- prefetch는 기본값이 설정되어있었기 때문에
- prefetch에도 staleTime과 cacheTime 설정을 해줄수 있다.

### re-fetch 옵션을 전역에 적용

- 전역에 위의 refetch 옵션을 설정하게 되면, useQuery와 prefetch 쿼리 적용이 기본 설정 옵션이 된다.
- 혹여나 특정쿼리에서는 다른 옵션을 주고 싶다면? ⇒ **특정 쿼리에가서 refetch 옵션을 주면 덮어 쓰어진다.**

<aside>
💡 appointments : ㅇㅖ약 서비스애는 전역 설정을 주고 싶지않다. ( 시시각각 바뀌는 데이터이기 때문..  + 서버에서 가장 변경이 잦은 데이터임 )

</aside>

- appointments 쿼리는 이런 기본 값을 오버라이드하는 설정이 들어간다. ( stale-time은 0이 되고, cache-time은 제한 된다.) + 폴링으로 주기적으로 데이터를 서버에서 불러온다.
- 전역 옵션을 설정하는 위치는 /src/reac-query/queryClient.ts 이다.

```tsx
//src/react-query/queryClient.ts

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 60000,
      cacheTime: 90000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})
```

- 전역에 이렇게 설정을 해준다는 것은 **네트워크 호출에 보수적으로 셋팅**하겠다라는 것이고 (리페칭을 최대한 안하는 것…)
- 저렇게 옵션을 주게 되면 데이터가 항상 최신이 아니기때문에 성격에 따라 무용지물로 만들기 쉽다. ⇒ 혹시나 사용자들은 원하는 정보를 얻지 못할 수 있다.

<aside>
💡 또는 대부분의 쿼리에서 리페칭을 할 만큼 데이터 변경이 충분치 않다는 뜻이다.

</aside>

- 모든 useQuery와 prefetch에 이 옵션을 적용한 것이 된다.

### appointments의 특정 쿼리에 옵션을 override 하려고한다.

- 다른 쿼리들 staff, treatments와는 다르게 `appointments`는 데이터의 변경이 시시각각 일어나고 최신 정보가 중요한 쿼리이다.
- 추가로 사용자의 사용이 없더라도 서버의 최신데이터가 항상 화면에 반영되야 한다.

```tsx
// common options for both useQuery and prefetchQuery
const commonOptions = {
  staleTime: 0,
  cacheTime: 300000,
}

const fallback = {}

const { data: appointments = fallback } = useQuery(
  [queryKeys.appointments, monthYear.year, monthYear.month],
  () => getAppointments(monthYear.year, monthYear.month),
  {
    ...commonOptions,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  },
)
```

- 옵션을 적용하고 싶은 useQuery에 직접 적용을 하게 된다. → prefetch에도 적용해줘야 한다!

### 폴링!

- refetchingInterval 프로퍼티를 사용해 이제 리페칭 간격 옵션을 사용하고, 이것으로 시간 간격을 리페칭 할 것이다.
- `useUserAppointments` Hook은 **로그인 한 사용자의 모든 예약 사항을 검색한다.** ⇒ 사용자 페이지 화면을 위해서
- 반면에 useAppointments Hook은 **모든 사용자의 예약을 검색한다.**

![스크린샷 2023-02-19 오후 3.10.51.png](Re-fetching%2096ef5a9b721c4f7fae3e65c43de8ad55/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-02-19_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_3.10.51.png)

```tsx
{
      ...commonOptions,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000, // every second; not recommended for production
    },
```

<aside>
💡 이렇게 설정하고, 예약 확인페이지에 가보면 1초마다 리패칭이 자동적으로 일어난다…. 대박쓰….

</aside>

### 정리

- 필터링을 구현하기 위한 useQuery의 select option을 알아보았다.
- 필터링 조건을 구현한 함수는 stable 함수여야하기 때문에 `useCallback`으로 감싸서 사용했다.
- 리페칭 옵션을 살펴보았고, 이들을 제한하기도 하였다. refetch 시리즈를 false로 제한함.
- 이 옵션을 특정 쿼리의 사용과 프리페칭 쿼리 호출시 전역 옵션에 추가하고 오버라이드 했다. useAppointments
- 서버에서 변경이 발생할 경우 특정 간격으로 데이터를 다시 불러오게끔 폴링을 하였다.
