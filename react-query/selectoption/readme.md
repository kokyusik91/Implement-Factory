# useQuery์ select option

<aside>
๐ก useQuery์ select option์ ์ฌ์ฉํ๊ฒ ๋๋ฉด ์ฟผ๋ฆฌ ํจ์๊ฐ **๋ฐํํ๋ ๋ฐ์ดํฐ๋ฅผ** `๋ณํ` ํ  ์ ์๋ค. โ ํํฐ๋ง ๋๋!!

</aside>

- useQuery์ option์ผ๋ก select ์ต์์ ์ ๋ฌํ๋ค์, ์ด๋ค state๊ฐ์ด false์ผ๋, ๊ทธ๋ฆฌ๊ณ  true์ผ๋์ ์ฝ๋ฐฑํจ์๋ฅผ ๋๊ฒจ์ useQuery์์ ์ต์ด๋ก ๋ฐ์์จ {data}๋ฅผ ์ฝ๋ฐฑํจ์์ ๋ง๊ฒ ํํฐ๋ง ํ  ์ ์๋ค.
- select ์ฝ๋ฐฑ ํจ์๋ ์๋ ๋ฐํ๋์์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์์ ๋ณํํ ๋ค์ ๋ณํํ ๋ฐ์ดํฐ๋ฅผ ๋ฐํํ๋ค.

```tsx
// ์ ์ ์ ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ filterํด์ ๋ฐ์ดํฐ๋ฅผ ๋ฐํํ๋ค.
const selectFn = (data) => {
  getAvailableAppointments(data, user)
}
```

- useCallback์ ์ฌ์ฉํ์ฌ selectFn์ ์ต์ ํ๋ฅผ ์งํํ๋ค. ( Selector Function์ useCallback์ผ๋ก ๊ฐ์ธ์ React-Query์ ์บ์ฑ ํดํ์ ๋ฐ๋๋ค. )
  - ์ต์ ํ๋ ๋ฐ์ดํฐ์ ๋ณ๊ฒฝ ์ฌ๋ถ์ ํจ์์ ๋ณ๊ฒฝ ์ฌ๋ถ๋ฅผ ํ์ธํ๊ณ , ๋ณ๊ฒฝ ์ฌํญ์ด ์์ผ๋ฉด ํด๋น ํจ์๋ฅผ ๋ค์ ์คํํ์ง ์๋๊ฒ.
  ```tsx
  useCallback((data) => getAvailableAppointments(data, user), [user])
  ```
- ์กฐ๊ฑด์ค์ ์ ์ฒด๋ฅผ ๋ณด์ฌ์ค์ผํ๋ state๊ฐ ์๋ค๋ฉด???? selector Fn์ ์ฌ์ฉํ์ง ์์ผ๋ฉด๋๋ค.
  ```tsx
  {
    selector: showAll ? undefined : selectorFn
  }
  ```
- Selector ์์
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
