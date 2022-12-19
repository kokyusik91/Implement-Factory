import { AutoTypeText } from './autotyping.js'
/**
 * App이 하는 역할
 * 1. <section class='document'></section>을 가져온다.
 * 2.
 */
export class App {
  constructor(private node: HTMLElement) {
    const text = new AutoTypeText('점심 뭐먹어요 우리??? 🍱 - kks')
    console.log(text)
    text.attachTo(node)
  }
}

const body = document.querySelector('.document')! as HTMLElement
new App(body)
