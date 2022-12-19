export class AutoTypeAdvanced {
  private element: HTMLElement
  private index: number = 0
  constructor(textArray: string[]) {
    const template = document.createElement('template')
    template.innerHTML = `<div class='container'>Language <h1 class='langType'></h1></div>`
    this.element = template.content.firstElementChild as HTMLElement

    const h1Element = this.element.querySelector(
      '.langType',
    )! as HTMLHeadingElement

    const typing = async () => {
      const letter = textArray[this.index].split('')

      while (letter.length) {
        await this.wait(100)
        console.log('길이', letter.length)
        h1Element.innerHTML += letter.shift()
      }

      await this.wait(900)
      remove()
    }

    const remove = async () => {
      const letter = textArray[this.index].split('')

      while (letter.length) {
        await this.wait(100)

        letter.pop()
        h1Element.innerHTML = letter.join('')
      }

      this.index = !textArray[this.index + 1] ? 0 : this.index + 1
      typing()
    }

    setInterval(typing, 3000)
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
    parent.insertAdjacentElement(position, this.element)
  }

  wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms))
  }
}
