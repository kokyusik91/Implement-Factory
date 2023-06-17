const createCustomArray = (size, initalNumber = null) => {
  const baseArray = []
  const row = new Array(size).fill(initalNumber)

  for (let i = 0; i < size; i++) {
    baseArray.push(row)
  }

  return baseArray
}

const myArray = createCustomArray(10)
console.log(myArray)
