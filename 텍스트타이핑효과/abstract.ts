export abstract class Abs_sleep {
  // 멤버 변수도 선언할 수 있다.
  private budget: number = 2000000000 // 예산

  // 추상화 Class인데 직접 구현해서 상속받는 Class에서 사용 가능
  public sleep = (delay: number) => {
    const start = new Date().getTime()
    while (new Date().getTime() < start + delay);
    console.log('함수 종료!')
  }
  // 추상 메서드 정의
  protected abstract sum(a: number, b: number): number

  // 실제 메서드 정의
  protected putWon() {
    return this.budget + '원'
  }
}
