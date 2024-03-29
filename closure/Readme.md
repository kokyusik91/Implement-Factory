## ## 실행함수의 컨텍스트의 Outer 관련. (외부 환경 참조)

- Outer Environment Reference
- 바깥 Lexical Environment를 가르킨다

### 예시

```javascript
let lamp = false

function goTo2F() {
  let lamp = true

  console.log(lamp)
}

goTo2F()
```

1. 전역 실행 컨텍스트를 생성하고 환경 레코드에 `lamp 식별자`와 `goTo2F 함수객체`가 기록된다.
2. goTo2F의 함수 실행 컨텍스트가 생성되고, 해당 실행 컨텍스트의 환경 레코드에 `lamp 식별자`가 저장된다.
3. `console.log(lamp)`를 실행하기 위해 함수 실행 컨텍스트의 환경 레코드를 뒤진다.
4. lamp가 함수 실행컨텍스트와 전역 실행컨텍스트의 환경레코드에 이렇게 2개가 존재한다.

### 식별자 결정

코드에서 변수나 함수의 값을 결정하는 것
콜 스택안에 동일한 식별자가 여러개 있을때, 자바스크립트 엔진이 OUTER를 활용해서 어떻게 의사 결정을 하는지?

함수 실행컨텍스트가 생성되고, 자바스크립트엔진은 새로 생성된 함수 실행컨텍스트에 바깥 렉시컬 환경으로 돌아갈 수 있는 Outer를 심어 놓는다.
이를 통해 함수 실행 컨텍스트는 이전 실행 컨텍스트의 Environment Record에 저장된 식별자도 참조 할 수 있게 되었다

![[Pasted image 20230517112535.png]]

- 이런식으로 현재 생성된 실행 컨텍스트는 이전 실행컨텍스트를 참조할수 있는 사다리를 놓게 된다
- `console.log(pet)`을 실행시키기 위해 자바스크립트 엔진은 현재 활성화 되어있는 실행 컨텍스트를 먼저 확인한다.
- 현재는 3번쨰 실행컨텍스트의 환경레코드 안에 pet에 puppy라는 값이 저장되어있으므로, 출력이 잘 된다.
- `console.log(corona)`를 출력 할려고할때, 자바스크립트 엔진은 현재 활성화 되어있는 Environment Record를 확인해보아도 corona라는 식별자를 찾을 수 없다.
- Outer가 가르키는 바깥(OUTER 사다리를 타고) 렉시컬 환경으로 가서 corona 식별자를 찾는다.
- 전역 실행 컨텍스트까지 와버렸는데, 여기도 corona 가 없기때문에... 자바스크립트 엔진은 corona 찾는 것을 멈춘다. => Reference
- 만약에 2층에서 해당 식별자를 찾는다면 전역 컨텍스트까지 찾는것을 시도하지 않는다.

현재 활성화 되어있는 실행컨텍스트는 하나이지만... 이전 렉시컬 환경을 가리키는 outer로 타고타고 갈 수 있기때문에 3층에 없으면 2층, 2층에 없으면 1층을 찾을 수 있다

## 스코프 체인

식별자를 결정할때 활용하는 스코프들의 연결리스트를 `스코프 체인` 이라고 한다.

## 스코프 체이닝

식별자를 결정하기 위해 타고 타고 가서 찾는 과정 자체를 스코프 체이닝 이라고 한다.
