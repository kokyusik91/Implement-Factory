# Mutation

### Mutation

- mutation의 서버 데이터를 업데이트 시켜준다.
- 전역에서 페칭 인디케이터 및 오류 처리를 설정하려고 한다.
- 에러의 경우 mutation 속성에서 onError 콜백을 설정한다.
- 로딩 인디케이터 useIsMutating ⇒ mutation 중 현재 해결되지 않은 것이 있는지 알려준다. like useIsFetching

### Invalidate query

- 데이터가 캐시에서 제거되고, 리페치(refetch)를 트리거 할 수 있다.

### useMutation

- 서버에서 데이터를 변경할 것이기 때문
- useQuery와의 차이점
  1. useMutation은 일회성이기 때문에, **캐시 데이터가 없다. no cache data !!**
  2. 기본적으로 에러가 낫을시에 재시도가 없다. ↔ useQuery는 기본적으로 세 번 재시도 한다.
  3. 관련된 데이터가 없으므로 refetch도 없다.
  4. 캐시 데이터가 따로 없으므로 `isLoading`이 없다. 캐시데이터가 존재하지않으므로 그냥 isFetching만 있다.
  5. useMutation은 반환 객체에서 `mutate` 함수를 반환한다.
     1. 이 mutate 함수가 실제로 실행하는데 사용된다.
  6. onMutate Callback도 있는데 이것은 낙관적 업데이트에 사용할 예정이다. (이전 상태를 저장하는데 사용)
  ```tsx
  async function setAppointmentUser(
    appointment: Appointment,
    userId: number | undefined,
  ): Promise<void> {
    if (!userId) return
    const patchOp = appointment.userId ? 'replace' : 'add'
    const patchData = [{ op: patchOp, path: '/userId', value: userId }]
    await axiosInstance.patch(`/appointment/${appointment.id}`, {
      data: patchData,
    })
  }

  export function useReserveAppointment(): UseMutateFunction<
    void,
    unknown,
    Appointment,
    unknown
  > {
    const { user } = useUser()
    const toast = useCustomToast()

    const { mutate } = useMutation((appointment: Appointment) =>
      setAppointmentUser(appointment, user?.id),
    )

    return mutate
  }
  ```
  - useMutation으로 서버데이터를 업데이트하더라도

### InvalidateQuries

- 예약 시 appointment를 변경할 때 appointment 데이터에 대한 캐시를 무효화 할 예정이다.
  - 사용자가 페이지를 새로고침 할 필요가 없다.
- InvalidateQuries의 역할
  - 쿼리를 만료로 표시하고, 쿼리가 현재 렌더링 중이면 리페치를 트리거한다.
- 순서
  - mutate가 호출되면?
  - onSuccess 콜백이 실행되면서
  - invalidateQueries로 관련된 쿼리를 무효화하고
  - refetch가 트리거 된다.
  - 데이터 최신화
  ```tsx
  const { mutate } = useMutation(
    (appointment: Appointment) => setAppointmentUser(appointment, user?.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.appointments])
        toast({
          title: 'You have reserved the appointment',
          status: 'success',
        })
      },
    },
  )
  ```
  - 전체 예약관련 query 캐시데이터를 무효화되어야한다. ⇒ 사용자 예약내역에는 표시가 안
  - 추가 주의 사항!!
    - useMutation은 인수를 mutation함수에 전달한다.

### Query key prefixes

- mutation으로 모든 appointments와 관련된 쿼리들을 무효화 해야하는게 우리의 목적이다.

<aside>
💡 query key prefix로 해결 가능!

</aside>

- invalidateQuries는 정확한 키가 아닌 접두사를 사용한다. 따라서 동일한 쿼리 키 접두사로 서로 관련된 쿼리를 설정하면, 모든 쿼리를 한번에 무효화 할 수 있다.
- 정확한 키로 설정하고 싶다면? { exact : true } 라는 옵션을 주면 된다.
- 쿼리 키 및 invalidateQuries의 키 매칭에 대한 공식문서

[Query Invalidation | TanStack Query Docs](https://tanstack.com/query/latest/docs/react/guides/query-invalidation?from=reactQueryV3&original=https://tanstack.com/query/v3/docs/guides/query-invalidation#query-matching-with-invalidatequeries)

### Mutation으로 쿼리 캐시 업데이트하기

- Mutation을 보낼때, 서버가 보낸 응답에서 캐시를 업데이트하는 법.
- usePatchUser : 서버에서 사용자를 업데이트하는 데 사용할 메서드이다.
- onSuccess 콜백은 서버로 부터 응답을 받아서, 해당 데이터를 사용해서 쿼리 캐시를 업데이트한다.

[Updates from Mutation Responses | TanStack Query Docs](https://tanstack.com/query/latest/docs/react/guides/updates-from-mutation-responses?from=reactQueryV3&original=https://tanstack.com/query/v3/docs/guides/updates-from-mutation-responses)

```tsx
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();

  // TODO: replace with mutate function
  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      onSuccess: (userData: User | null) => {
        if (user) {
          updateUser(userData);
          toast({
            title: 'User updated!',
            status: 'success',
          });
        }
      },
    },
  );

  return patchUser;
```
