# Data Fetching API

### getInitialProps

- getInitialProps나 getServerSideProps가 있다면, 해당 파일은 JS파일로 빌드되고 이게 없다면 static한 html로 빌드된다.
- 9버전 이전에는 getServerSideProps나 getStaticProps가 없었을때 getInitialProps를 사용했다.
- 잔재물이다….. (사용 잘 안함)
- async 함수이다.

### getServerSideProps

- 9.3version에 처음 소개 되었다!
- return 에는 총 2가지 정도가 있다.
  - props
  - notFound : true // 데이터가 없다면 404 보여줌
  - redirect : page요청에 대한 리다이렉트 시킬때

### getStaticPaths

- 9.3version에 처음 소개 되었다!
- 9.5v 에서 ISR이 나옴
- `Dynamic Routes`랑 관련있다.
- return 객체
  - `paths`
  - fallback : true, false
    - false일때는 build때는 404 page를준다. (다시 build해야함)
    - true일때는 build할때 아이디 가 없었더라도 페이지 요청이 왔을때, 그것에 맞는 화면 내려줌
    - static한 페이지가 너무 많을때 build때 너무 페이지가 많으면, fallback true를 준다.
    - true를 줬다해도 제너레이트된 페이지가 보여주는건 아니다.
    - fallback : blocking :
    <aside>
    💡 fallback은 ISR에 사용하면 좋다.
    
    </aside>


### getStaticProps

- SSG을 더 추천한다.
- return
  - props
  - revalidate : ISR을 위한 옵션이다.
  - notFound
