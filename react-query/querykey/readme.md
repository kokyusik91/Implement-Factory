# Query Key

query키는 고유 값으로 특정 쿼리의 캐시와 staleTime을 식별한다.

특정 게시물 조회하기. useQuery에서 넘길때 postId가 필요하다.

```jsx
const { data, isLoading } = useQuery(['comments', postId], () =>
  fetchComments(postId),
)
if (isLoading) return <h3>Loading.....</h3>
```

쿼리키는 상관없고, 쿼리 function에 postId를 넘기는 방식이 중요하다.

같은 쿼리키를 사용할때, 리페치가 일어나지 않는다. 같은 게시글이 조회된다.

### 왜 같은 댓글만 조회가 될까??

현상 : 다른 게시물제목을 눌러도 데이터 페칭이 일어나지 않는다.

이유 : 모든 쿼리 키가 같은 `comments` 키를 사용하고 있다.

<aside>
♻️ 알려진 키는 어떤 트리거가 있어야 리페치가 일어난다.

</aside>

게시물 제목을 클릭할때는 이러한 트리거가 일어나지 않는다. 그래서 데이터가 stale 임에도 리페치가 일어나지 않는다.

각 게시물에 대한 쿼리 라벨을 설정해 주면 된다. ⇒ 쿼리키를 배열로 전달한다.

`[’comments’, post.id]`

postId가 변경하면 리액트 쿼리가 새 쿼리를 생성해서 각각의 staleTime, cacheTime을 가지게 된다.

데이터를 가져오는 쿼리 함수에 값이 쿼리 키에 포함된다.

모든 comments 쿼리가 같은 쿼리로 여겨지는 것을 방지한다.

여기서 `postId` 는 의존성 배열로 동작한다.

### 쿼리 비활성화 (inactive)

다른 게시물 제목을 클릭할때마다, 이전 [comments, id] 쿼리가 `inactive` 상태로 바뀐다.

여기서는 이전 쿼리인 `[‘comments’,1]` 이 비활성화 되었다.

하지만 캐시에는 남아 있다! ( cacheTime을 따로 설정하지 않으면 5분후 가비지 컬렉터가 수거해간다)
