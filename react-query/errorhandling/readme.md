# 에러 핸들링 (중앙 에서 제어)

모든 useQuery 호출에 오류 핸들링 방식을 적용해서, 각 호출에 따로 지정하지 않도록 하려고함.

### 왜 react-query는 useIsFetching Hook (데이터 가져오는 중인지 아닌지 유무를 boolean값 return) 은 존재하지만 useError Hook은 없을까?

- 존재 할 수 없다
- isFetching은 가져오는지 안가져오는지는 정수값으로 판단이 가능 ex) 0 : 아직 안가져옴, 1 : 가져오는중, 2 : 가져옴 이런식
- 하지만 사용자에게 오류를 표시하려면 각 오류에대한 문자열이 필요. 하지만 시시각각 각각 다른 문자열을 가진 오류가 시시각각 팝업하도록 구현하는것은 어렵다.
- useIsFetching이 현재 가져오는 쿼리의 번호를 주는것과는 다르다…

<aside>
♻️ 최상단에 선언한 QueryClient의 옵션으로 onError 에 에러핸들러를 부착시켜서 프로젝트에 들어가있는 useQuery들 각각에서 에러 핸들링을 할 필요없게 만들어주려고한다.

</aside>

```tsx
// queryClient.ts

import { createStandaloneToast } from '@chakra-ui/react'
import { QueryClient } from 'react-query'

import { theme } from '../theme'

const toast = createStandaloneToast({ theme })

// 실제 에러 핸들러 함수
function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = 'react-query-error'
  const title =
    error instanceof Error ? error.message : 'error connecting to server'

  // prevent duplicate toasts
  toast.closeAll()
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true })
}

// to satisfy typescript until this file has uncommented contents

// queryClient에 defaultOptions를 추가하여, 에러 핸들러를 부착시켜준다.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
})
```

최상단 queryClient에 에러핸들러를 부착한 모습

기존에 useTreatments인 특정 useQuery에서 사용하던 에러 핸들러를 제거 해준다.

```tsx
export function useTreatments(): Treatment[] {
  const fallback = []
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments)
  return data
}
```

### 대안으로 React의 Error Boundary를 사용할 수 있다.

react-query의 에러를 따로 처리하고 싶지 않다면,…. useQuery에 useErrorBoundary 옵션을 사용한다.

- useErrorBoundary 옵션을 true로 설정하면, React-query 내에서 에러를 처리하는 대신 가장 가까운 ErrorBoundary 로 에러를 전파한다.

<aside>
♻️ 즉 react-query에서 에러 처리를 하고 싶지 않다면, React의 Error Boundary를 사용하고, useQuery 혹은 queryClient 의 `useErrorBoundary : true` 를 옵션으로 전달하게되면 에러가 가장 가까운 ErrorBoundary로 에러를 전파한다.

</aside>
