import { Abs_sleep } from './abstract.js'

export class AutoTypeText extends Abs_sleep {
  private element: HTMLHeadingElement
  private index: number = 0
  constructor(text: string) {
    super()
    this.element = document.createElement('h1')
    this.element.setAttribute('class', 'text')

    setInterval(() => {
      this.addText(text, this.element, () => {
        this.sleep(3000)
      })
    }, 200)
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
    parent.insertAdjacentElement(position, this.element)
  }

  private addText(
    targetText: string,
    textNode: HTMLHeadingElement,
    callBacFunc: () => void,
  ) {
    textNode.textContent += targetText[this.index++]
    if (this.index > targetText.length) {
      textNode.textContent = ''
      this.index = 0
      callBacFunc()
      console.log('if 문 탈출!')
    }
  }

  sum(a: number, b: number) {
    return a + b + this.index
  }
}
