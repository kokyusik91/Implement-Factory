## 브라우저에서 실행되는 코드와 Node.js환경에서 실행되는 코드

```jsx
// test.js

if (typeof window !== 'undefined') {
  console.log('브라우저')
  const a = 1
  const b = 2
  console.log(a + b)
}

if (typeof window === 'undefined') {
  console.log('node.js 환경')
  const a = 2
  const b = 3
  console.log(a + b)
}
```

1. js파일을 index.html에 연결하고 브라우저에서 실행시키면 위에 코드가 실행되고,

<br/>

2. node.js에서 `node test.js` 로 실행 시키게 되면 밑에 코드가 실행된다.

<aside>
💡 typeof window를 통해서 같은 파일에서 다른 코드를 실행 시킬 수 있다.
</aside>

<br/>

[JavaScript 및 Node.js, 전역 객체에 접근하기](https://inspiredjw.tistory.com/entry/JavaScript-전역-객체에-접근하기)

<br/>

### Node.js 환경의 전역 상수가 있음

- \_\_filename : 현재 파일의 이름
- \_\_dirname : 현재 파일 경로

```jsx
if (typeof window === 'undefined') {
  console.log(__filename)
  console.log(__dirname)
}

// /Users/kyusikko/Desktop/Programming/factory/test.js
// /Users/kyusikko/Desktop/Programming/factory
```
