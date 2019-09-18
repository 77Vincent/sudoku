const {
  pick,
  getBlockRange,
} = require('./utilities')

function testPick(array) {
  const iterations = 9999
  const counter = new Array(array.length).fill(0)

  for (let i = 0; i < iterations; i += 1) {
    const p = pick(...array)
    counter[array.indexOf(p)] += 1
  }

  const total = counter.reduce((a, n) => a + n)

  counter.forEach(num => {
    console.log(num / total)
  })
}

function testGetBlockRange() {
  for (let i = 1; i <= 9; i += 1) {
    console.log(getBlockRange(i))
  }
}

testPick([1, 2, 3, 4])

testGetBlockRange()