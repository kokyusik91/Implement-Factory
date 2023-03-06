# 컴포넌트 요소 스타일 배치에 대한 고민

### 의문?🤔 : `styled-component`로 재사용하기 위한 컴포넌트를 만들고 사용하려는데 요소 배치관련 스타일을 어떻게 선언하는게 좋을지?!?

### 1. 대상 `<Title/>` 컴포넌트

```jsx

// Title 컴포넌트 내부
function Title({
  children,
  textType = 'v2_h2_b',
}: ExtraAppTitle) {

  return (
    <TitleEl textType={textType}>
      {children}
    </TitleEl>
  )
}

const TitleEl = styled.h1<{ textType: keyof TypoTypes }>`
  ${(props) => assginText(props.textType)};
  color: ${({ theme }) => theme.palette.grey[800]};
  cursor: pointer;
`

export default ExtraAppTitle
```

- Title 컴포넌트는 고유의 속성만 가지고 있고 요소 배치 관련 스타일(margin, position, flex, 등등)은 따로 내부에 선언하지 않음 ⇒ 재사용 하기 위함

---

### 1. 방법 : 컴포넌트를 <div>로 감싸서 인라인 스타일을 준다.

```jsx
// app.jsx

return (
  <>
    <div
      style={{
        marginTop: '20px',
        marginBottom: '30px',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
      }}
    >
      <Title>이것은 제목 입니다</Title>
    </div>
    <Content>뭐시기뭐시기</Content>
  </>
)
```

장점

1. Title 컴포넌트 내부는 Clean
2. Title 컴포넌트 재사용 가능해짐

단점

1. div로 감싼 인라인 스타일, ⇒ 일단 그냥 이건 아닌것 같음…..
2. JSX쪽 코드가 지져분해짐…. 컴포넌트 마다 div로 감싸서 style 줘야함…

---

### 2. 컴포넌트에 props로 스타일 속성들을 넘긴다.

```jsx
// app.jsx

return (
  <>
    <Title mt={20} mb={30} pos={'absolute'}>
      이것은 제목 입니다
    </Title>
    <Content>뭐시기뭐시기</Content>
  </>
)

// 혹은

return (
  <>
    <Title
      customStyle={`margin-top:20px; margin-bottom:30px; position:'absolute'; .....`}
    >
      이것은 제목 입니다
    </Title>
    <Content>뭐시기뭐시기</Content>
  </>
)
```

장점

1. 장점이 없는듯?!?

단점

1. props가 계속 증가하면….. <Title> 컴포넌트 내부가 드러워진다. props 괴물이될듯…
2. 컴포넌트 props에 데이터나, 함수가 아니고 스타일 값들이 들어가면서 JSX쪽 코드가 지져분해진다.

---

### 3. 배치 스타일만 들어가있는 Container 컴포넌트를 그때그때 만들어서 사용한다.

```jsx
return (
  <>
    <TitleContainer>
      <Title>이것은 제목 입니다</Title>
    </TitleContainer>
    <Content>뭐시기뭐시기</Content>
  </>
)

const TitleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 20px;
  margin-bottom: 30px;
`
```

장점 :

1. JSX 가독성이 좋음 ( JSX 어디에도 스타일 코드가 안들어가 있음 )
2. Title 컴포넌트 자체는 배치관련해서는 상관안써도됨 + 재사용가능

단점 :

1. styled-components로 계속 저렇게 배치 관련 스타일만 들어간 컴포넌트를 만들어줘야함
2. 컴포넌트 이름 짓기가 빡셈…
