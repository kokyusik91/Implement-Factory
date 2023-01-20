const body = document.querySelector('body')
const MIN_DURATION = 10

// 눈 내기 위한 함수
function makeSnowFlake() {
  const snowflake = document.createElement('div')
  const delay = Math.random() * 10
  const initialOpacity = Math.random()
  const duration = Math.random() * 20 + MIN_DURATION

  snowflake.classList.add('snowflake')
  snowflake.style.left = `${Math.random() * window.screen.width}px`
  snowflake.style.animationDelay = `${delay}s`
  snowflake.style.opacity = `${initialOpacity}`
  snowflake.style.animation = `fall ${duration}s linear`

  body?.appendChild(snowflake)

  setTimeout(() => {
    body?.removeChild(snowflake)
    makeSnowFlake()
  }, (duration + delay) * 1000)
}
/**
 * 눈을 무한으로 반복하기 위해섬
 */
for (let i = 0; i < 50; i++) {
  setTimeout(makeSnowFlake, 500 * i)
}
