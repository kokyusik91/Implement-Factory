// 투표용지 갯수

const members = 'ABBCDDE'
const obj = {}
// 문자열을 순회하면서 해당문자를 key값으로 만드는 객체를 만든다.
for (letter of members) {
  // 객체에 현재 키 값이 있으면? value에 1을 더해준다.
  if (letter in obj) {
    obj[letter] += 1
  } else obj[letter] = 1
}

let maxNumber = Number.MIN_SAFE_INTEGER
let targetKey = ''

for (let key in obj) {
  //
  if (obj[key] > maxNumber) {
    maxNumber = obj[key]
  }

  if (maxNumber === obj[key]) {
    targetKey = key
  }
}

console.log(targetKey)

const personArr = [
  [
    ['name', '루씨'],
    ['age', 17],
    ['city', 'NewYork'],
  ],
]

const personObj1 = Object.fromEntries(personArr)
console.log(personObj1)
const personObj2 = personArr.map((el) => Object.fromEntries(el))
console.log(personObj2)
