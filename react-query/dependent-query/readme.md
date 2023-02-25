# 의존적 쿼리

- **어떤 조건 하에서만 활성화가 되는 Dependent Queries를 알아보려고한다.**
  - 로그인 했을때 만 활성화 되는 쿼리를 말하는 건가?!?!! ⇒ 와우!
- setQueryData는 실제로 캐시에서 데이터를 설정하기 위함이고
- removeQuries는 캐시에서 쿼리를 삭제하기 위함이다.

### JWT

- 클라이언트가 사용자 명과 비밀번호를 서버에 보내고
- 이 사용자 명과 비밀번호가 DB에서 일치한다면? 서버가 **토큰을 보내는 방식으로 작동한다.**
- 클라이언트는 헤더에 토큰을 요청과 함께 보낸다.
    <aside>
    💡 이를 통해 서버가 이 클라이언트가 인증됐음을 인지한다.
    
    </aside>

- 유저 정보가 담긴 인코딩된 토큰을 서버에 보내게 되면 서버에서는 이 토큰을 디코딩하여 데이터가 일치함을 확인 할 수 있다.
- 이 앱에서는 localstorage에 Token을 저장해놓는다 ⇒ 사용자가 페이지 새로고침을 하더라도 사용자가 로그아웃 되지 않는다.

### useUser 훅

- 쿼리 캐시에 사용자 데이터를 저장할 것이다.
- useUser Hook은 객체를 반환한다. ⇒ 객체 항목 중 하나가 이 사용자 데이터가 된다. ( 즉 사용자 데이터를 반환한다.)

### 두 가지 Hook의 데이터 흐름에 대해 알아보려고 한다.

1. useAuth Hook은 총 3가지 기능이 있다.

   1. 로그인
   2. 회원가입
   3. 로그아웃

   <aside>
   💡 useAuth Hook의 책임은 useUserHook의 함수들이 서버와 통신하도록 하는 것이다.

   </aside>

2. useUser Hook : 실제 react-query가 작동한다.

   1. 실제 user 데이터
   2. updateUser : 사용자 로그인이나, 사용자 정보 업데이트를 처리한다.
   3. clearUser : 로그아웃

   <aside>
   💡 useUser Hook의 책임은 로컬 스토리지와 쿼리 캐시에서 사용자의 상태를 유지하는 것이다.

   </aside>

   ```tsx
   // useUser.ts

   async function getUser(user: User | null): Promise<User | null> {
     if (!user) return null
     const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
       `/user/${user.id}`,
       {
         headers: getJWTHeader(user),
       },
     )
     return data.user
   }
   ```

   - 로그인 사용자가 없으면 서버 까지 도달하지 않고 null을 반환한다.
   -

   ### 쿼리 캐시에 값을 설정하기 위한 방법

   - `queryClient.setQueryData` 를 사용한다.
   - 원리 : 쿼리 키와 값을 가져와 쿼리 캐시에 해당 키에 대한 값을 설정한다.
   - 쿼리함수와 비슷해보이지만 여기서는 쿼리함수를 쓰지 않고 직접 설정할 수 있따.
   - useUser Hook에 있는 `updateUser`와 `clearUser`에 setQueryData 호출을 추가 할 수 있따.
   - signIn, signup 즉 로그인 회원가입을 하고 나면 useUser Hook의 updateUer()가 각각 실행되고
   - signout 즉 로그아웃을 하게되면 useUser Hook의 clearUser()가 실행된다.

   ```tsx
   // user 정보를 가져오는 쿼리
   const { data: user } = useQuery([queryKeys.user], () => getUser(user))

   function updateUser(newUser: User): void {
     // TODO: update the user in the query cache
     queryClient.setQueryData(queryKeys.user, newUser)
   }
   ```

   - setQueryData에 설정 하려는 쿼리 데이터에 대한 key를 입력한다. `queryKeys.user`
   - setQueryData에 설정 하려는 쿼리 데이터에 대한 value를 지정한다. `newUser`
   - 원리 : 사용자가 로그인을 해서 성공적으로 인증 되었을 경우 in useAuth ⇒ 캐시에 사용자 정보를 업데이트 한다 `updateUser(data.user)` 를 호출해서. in useUSer

   [화면 기록 2023-02-19 오후 4.06.42.mov](%E1%84%8B%E1%85%B4%E1%84%8C%E1%85%A9%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%A8%20%E1%84%8F%E1%85%AF%E1%84%85%E1%85%B5%20224ddec6cf3640fe9dac8cfa9e0c11c5/%25E1%2584%2592%25E1%2585%25AA%25E1%2584%2586%25E1%2585%25A7%25E1%2586%25AB_%25E1%2584%2580%25E1%2585%25B5%25E1%2584%2585%25E1%2585%25A9%25E1%2586%25A8_2023-02-19_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.06.42.mov)

   - Onsucess 콜백함수 : 쿼리 함수나, setQueryData에서 데이터를 가져오는 함수 이다.
     - 내가 종종 mutation에서 queryFn에서 받아온 res를 인자로 받아서 처리했던 것 같다.
     - 추가로 onSuccess 콜백은 setQueryData할때, useQuery가 success됬을때 둘다에서 실행된다.
       - setQueryData에서 실행될 때 전달된 데이터를 가져온다.
       ```tsx
       queryClient.setQueryData(queryKeys.user, **newUser**);

       queryClient.setQueryData(queryKeys.user, null);
       ```
       - onSuccess 인자로 newUser, null, 그리고 쿼리함수의 res가 들어온다.
       - onSuccess 콜백 작성 모습.
       ```tsx
       const { data: user } = useQuery([queryKeys.user], () => getUser(user), {
         onSuccess: (received: User | null) => {
           if (!received) {
             clearStoredUser()
           } else {
             setStoredUser(received)
           }
         },
       })

       // meant to be called from useAuth
       function updateUser(newUser: User): void {
         // TODO: update the user in the query cache
         queryClient.setQueryData(queryKeys.user, newUser)
       }

       // meant to be called from useAuth
       function clearUser() {
         // TODO: reset user to null in query cache
         queryClient.setQueryData(queryKeys.user, null)
       }
       ```
       - useQuery의 onSuccess 콜백은
       1. 쿼리 함수에서 데이터가 업데이트 되거나,
       2. setQueryData에서 데이터가 업데이트 될 때마다 호출된다.
         <aside>
         💡 여기서는 로컬 스토리지가 업데이트 된다! `clearStoredUser()`; `setStoredUser(received)`
         
         </aside>
         
         - 문제점 : 페이지를 새로고쳠했을때는 로그인 정보가 날아간다.
             - 페이지를 새로고침 → useQuery가 초기화 → 유저정보가 로컬 스토리지에 있는지 확인하는 로직이 없다.
         - 해결책 : useQuery의 `initialData`를 사용!!!
     ### InitialData
     - 초기 데이터를 캐시에 추가하고 싶을 떄 사용한다.
       <aside>
       💡 쿼리를 초기 데이터로 미리 채우는 방법에
       
       </aside>
       
       [Initial Query Data | TanStack Query Docs](https://tanstack.com/query/latest/docs/react/guides/initial-query-data?from=reactQueryV3&original=https://tanstack.com/query/v3/docs/guides/initial-query-data#using-initialdata-to-prepopulate-a-query)
       
       ```tsx
       const queryClient = useQueryClient();
         // TODO: call useQuery to update user data from server
         // 기존 사용자  값을 사용하여  서버에서 데이터를 가져오도록 했ㅏ.
         const { data: user } = useQuery([queryKeys.user], () => getUser(user), {
           **initialData: getStoredUser,**
           onSuccess: (received: User | null) => {
             if (!received) {
               clearStoredUser();
             } else {
               setStoredUser(received);
             }
           },
         });
       ```
       
       - useQuery에서 초기 데이터가 필요할 때마다, `getStoredUser` 함수를 실행한다.
       
       ```tsx
       // helper to get user from localstorage
       export function getStoredUser(): User | null {
         const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
         return storedUser ? JSON.parse(storedUser) : null;
       }
       ```


### Dependent Query

- useUserAppointments 사용
- user가 참일때만 쿼리가 실행하도록 할것이다.
  - 다시 말해서 user가 거짓이라면 쿼리를 비활성화 할 것이다.
  - 또 다시말해 user가 falsy이면, 사용자가 더 이상 로그인 상태가 아니다. ⇒ 에약 데이터를 보여줄 필요가 없다.

[Dependent Queries | TanStack Query Docs](https://tanstack.com/query/latest/docs/react/guides/dependent-queries?from=reactQueryV3&original=https://tanstack.com/query/v3/docs/guides/dependent-queries)

- 핵심 : **user가 거짓이라면? 쿼리 함수를 실행하지 않는다.**

```tsx
// for when we need a query function for useQuery
async function getUserAppointments(
  user: User | null,
): Promise<Appointment[] | null> {
  if (!user) return null
  const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
    headers: getJWTHeader(user),
  })
  return data.appointments
}

export function useUserAppointments(): Appointment[] {
  // TODO replace with React Query
  const { user } = useUser()
  const fallback: Appointment[] = []
  const { data: userAppointments = fallback } = useQuery(
    ['user-appointments'],
    () => getUserAppointments(user),
    { enabled: !!user },
  )
  return userAppointments
}
```

- user는 객체인데 !을 붙이면 `boolean` 타입이 된다.

### 주의 할점

![스크린샷 2023-02-19 오후 5.04.16.png](%E1%84%8B%E1%85%B4%E1%84%8C%E1%85%A9%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%A8%20%E1%84%8F%E1%85%AF%E1%84%85%E1%85%B5%20224ddec6cf3640fe9dac8cfa9e0c11c5/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-02-19_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_5.04.16.png)

- user 쿼리 옆의 숫자 6은 6개의 옵져버가 있다는 뜻인데
- useUser를 실행하는 앱의 모든 컴포넌트가 6개가 있다는 소리이다.
- 모든 컴포넌트가 해당 쿼리를 참고 하는 것이다.

### Remove Queries

- 로그아웃시 사용자 예약 쿼리를 제거하려고한다.
- 사용자가 로그아웃한 후에는 예약 데이터가 지워져야 한다. === 로그인 상태가 아닌 이상 보이면 안된다.
- queryClient의 removeQuries를 이용한다. ⇒ 특정 쿼리에 대한 데이터를 제거해야 한다.
- onSuccess는 setQueryData 다음에 실행되고, removeQueries 다음에는 실행되지 않는다.

```tsx
// meant to be called from useAuth
function clearUser() {
  // TODO: reset user to null in query cache
  queryClient.setQueryData(queryKeys.user, null)
  queryClient.removeQueries('user-appointments')
}
```

- 사용자가 로그아웃하면 ‘user-appointments’의 쿼리 데이터가 삭제되고 사용자 예약 쿼리 데이터가 보이지 않게 된다.

### 정의

- useUser 훅이 useQuery를 호출하고, user data를 제공하기 위해 쿼리 캐시를 사용했다.
- useUser 훅은 **쿼리 캐시** 외에도 로컬 스토리지를 관리했다.
- useAuth 관련 기능으로 로그인 및 로그아웃시 `setQueryData`를 이용해 쿼리 캐시를 직접 설정했다.
- useQuery의 onSuccess 콜백은 로컬 스토리지를 관리하며, 실행 시점은 setQueryData가 실행한 다음이나 쿼리 함수가 성공한 다음 호출 된다.
- dependent query : user가 참인지 거짓인지에 따라 쿼리 실행 및 비활성화
- removeQuries : 사용자가 로그아웃하면 사용자 예약 데이터를 지웠다.
