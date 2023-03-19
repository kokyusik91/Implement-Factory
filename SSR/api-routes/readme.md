# API Routes

- Frontend Service - Backend Service간의 연결
- Frontend Service는 고객과 닿아있고, Backend Service는 DB에 닿아있다.

<aside>
💡 고객이 DB에 접근하기 위해 FE는 BE와 연결되어야하고 이때 API를 활용한다. BE가 제공해주는 API를 통해 DB의 내용을 활용할 수 있다.

</aside>

### Next.js 의 API Routes

- 파일위치 /pages/api/`user.js`

- back-end

```jsx
// /pages/api/user.js

export default function handler(req, res) {
  res.status(200).json({ name: 'Jimmy Choi' })
}
```

- 이렇게 하드 코딩된 값만 res로 내리는게 아닌 DB조회를 해서 값을 불러오거나, 파일시스템에 접근해서 데이터들을 가져올 수 있다.

<aside>
💡 말 그대로 백엔드 코드를 작성 할 수 있음.

</aside>

- Front-end

```jsx

const [name, setName] = useState('?');

useEffect(() => {
	fetch('/api/user').then((res) => res.json())
	.then((data) => { setName(data.name)}}
},[])
```

- Dynamic Routes도 가능
- /pages/api/user-info/[uid].js

```jsx
// /pages/api/user-info/[uid].js

export default function handler(req, res) {
  const { uid } = req.query
  res.status(200).json({ name: `Jimmy Choi ${uid} ` })
}
```

- Front-end

```jsx
// 요청 url : localhost:3000/jimmy/name?uid=2
const { username, info, uid } = router.query

useEffect(() => {
	console.log(uid) // undefined
	fetch(`/api/user/${uid}`).then((res) => res.json())
	.then((data) => { setName(data.name)}}
},[])
```

- 주의할점 :

  - router.query에서 첫 렌더링시에는 undefined가 될 수 있다.
  - 추가 작업으로 조건을 걸어주면 된다.

- 변경한 사항

```jsx
// 요청 url : localhost:3000/jimmy/name?uid=2

useEffect(() => {
	if(uid != null){
		console.log(uid) // 2
		fetch(`/api/user/${uid}`).then((res) => res.json())
		.then((data) => { setName(data.name)}}
	}
},[uid])
```

- 조건을 걸어주어 uid가 한번 갱신되고 페칭이 되도록 바꿔야한다.

### Response 예시

1. res.status(code)
2. res.json(body) : serializable object
3. res.redirect(code, url) ⇒ 307도 줄수 있다.
4. res.send(body) : string / object / Buffer

오늘 웹 배포사항

1. 커뮤니티 : 무료나눔 ⇒ 나눔, 기타 카테고리 추가
2. 메인 페이지 배너 클릭시 노션으로 이동
3. 더보기 페이지 ⇒ 푸쉬알림 UI
4. 버전 정보 변경 1.0.1(3)
5. 게시글 상세 링크 눌렀을때 외부 페이지 이동

내일 진행 사항

1. 앱 내의 알림 페이지 완성
2. 푸쉬알림 API 연동 (앱 내 알림만)
3. 게시글 목록 페이지에서 미리보기 링크 노출
