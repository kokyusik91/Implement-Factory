# useQuery의 select option

<aside>
💡 useQuery의 select option을 사용하게 되면 쿼리 함수가 **반환하는 데이터를** `변환` 할 수 있다. ⇒ 필터링 느낌!!

</aside>

- useQuery의 option으로 select 옵션을 전달한다음, 어떤 state값이 false일때, 그리고 true일때의 콜백함수를 넘겨서 useQuery에서 최초로 받아온 {data}를 콜백함수에 맞게 필터링 할 수 있다.
- select 콜백 함수는 원래 반환되었을 데이터를 가져와서 변환한 다음 변환한 데이터를 반환한다.

```tsx
// 유저와 데이터를 받아서 filter해서 데이터를 반환한다.
const selectFn = (data) => {
  getAvailableAppointments(data, user)
}
```

- useCallback을 사용하여 selectFn의 최적화를 진행한다. ( Selector Function은 useCallback으로 감싸서 React-Query의 캐싱 해택을 받는다. )
  - 최적화는 데이터의 변경 여부와 함수의 변경 여부를 확인하고, 변경 사항이 없으면 해당 함수를 다시 실행하지 않는것.
  ```tsx
  useCallback((data) => getAvailableAppointments(data, user), [user])
  ```
- 조건중에 전체를 보여줘야하는 state가 있다면???? selector Fn을 사용하지 않으면된다.
  ```tsx
  {
    selector: showAll ? undefined : selectorFn
  }
  ```
- Selector 예시
  ```tsx
  export function useStaff(): UseStaff {
    // for filtering staff by treatment
    const [filter, setFilter] = useState('all')

    const selectFn = useCallback(
      (unfilteredSaff) => filterByTreatment(unfilteredSaff, filter),
      [filter],
    )

    // TODO: get data from server via useQuery
    const fallback = []

    const { data: staff = fallback } = useQuery([queryKeys.staff], getStaff, {
      select: filter !== 'all' ? selectFn : undefined,
    })

    return { staff, filter, setFilter }
  }
  ```
