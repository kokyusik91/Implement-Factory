import { AutoTypeText } from './autotyping.js'
import { AutoTypeAdvanced } from './autotypingAdvanced.js'
/**
 * App이 하는 역할
 * 1. <section class='document'></section>을 가져온다.
 * 2.
 */
export class App {
  constructor(private node: HTMLElement) {
    // const value = prompt('아무 텍스트나 입력해 보시오')
    // if (value) {
    //   const text = new AutoTypeText(value)
    //   text.attachTo(node)
    // }
    // const text = new AutoTypeText('점심 뭐먹어요 우리??? - kks')
    // text.attachTo(this.node)

    const advancedText = new AutoTypeAdvanced(['HTML', 'CSS', 'JAVASCRIPT'])
    advancedText.attachTo(this.node)
  }
}

const body = document.querySelector('.document')! as HTMLElement
new App(body)
