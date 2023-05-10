function closure() {
  let x = 1

  function increaseNumber() {
    return (x += 1)
  }

  function decreaseNumber() {
    return (x -= 1)
  }

  return {
    increaseNumber,
    decreaseNumber,
  }
}

const closureFunc = closure()
console.log(closureFunc.increaseNumber())
console.log(closureFunc.increaseNumber())
console.log(closureFunc.increaseNumber())
console.log(closureFunc.increaseNumber())
console.log(closureFunc.decreaseNumber())
