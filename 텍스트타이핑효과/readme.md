# 배운것

### 1. Date 생성자 (`new Date()`)

- 시간의 특정 지점을 나타내는 Date **객체**를 플랫폼에 종속되지 않는 형태로 생성한다.
- 실제로 Date 객체(인스턴스) 안에는 다양한 메서드들이 정의 되어있다.
  ![date-instance-method]('/assets/images/date-instance-method.png')
- console에 출력하면 `Mon Dec 19 2022 11:44:13 GMT+0900 (한국 표준시)`이런 식으로 출력이 된다.

### 2. `new Date().getTime()`함수

- 메서드는 표준시에 따라 지정된 날짜의 시간에 해당하는 숫자 값을 반환한다.
- 실제로 밀리초로 환산하여 가져온다.
- 1671418228644 이런식으로 가져온다.

### 3. 추상화 클래스 (abstract class)

클래스는 설계도이고, 추상화 클래스는 미완성 설계도이다. 추상화 클래스 안에는 추상 메서드 라는 것이 있는데, 이 추상 메서드는 선언부만 있고, 구현은 실제로 추상화 클래스를 상속받은 클래스에서 직접 구현을 진행해야한다.<br>
꼭 메서드를 선언까지만 할 필요는 없는 것 같다. 예를들어 항상 똑같은 동작을 해야하는 함수라면, 추상화 클래스에서 메서드를 구현까지 해놓고, 추상화 클래스를 상속받은 클래스에서 super() 키워드를 호출후, this.메서드()로 사용할 수 도 있다.

```ts
abstract class Abs_Class {
  // 함수 정의만 있고 몸체는 없다. abstract키워드를 붙여야 추상화 메서드로 인식된다.
  protected abstract sum(a: number, b: number): number
  // 실제 메서드를 구현까지 할 수도 있다.
  protected putWon() {
    return this.budget + '원'
  }
}
// Abs_Class 상속
class Use extends Abs_Class {
  constructor() {
    super()
    // 직접 구현한 메서드는 super()키워드 호출후 바로 사용가능하다.
    const won = this.putWon()
  }
  // 추상화 메서드를 직접 구현함.
  sum(a: number, b: number) {
    return a + b + this.index
  }
}
```

### Reference

1. 추상화 클래스 - 타입스크립트 가이드 북 :
   [추상화 클래스 정의](https://yamoo9.gitbook.io/typescript/classes/abstract-class).
2. 추상화 클래스 - 그냥 블로그
   [추상화 클래스 사용](https://developer-talk.tistory.com/368)
3. [타이핑 구현 Basic](https://codepen.io/fall031-muk/pen/yLbJWwB)
4. [타이핑 구현 Advanced](https://gurtn.tistory.com/168)
