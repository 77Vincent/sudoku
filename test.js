const {
  colorize,
  print,
  solve,
  validate,
} = require('./sudoku')

const validBoard = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [3, 1, 2, 8, 4, 5, 9, 6, 7],
  [6, 9, 7, 3, 1, 2, 8, 4, 5],
  [8, 4, 5, 6, 9, 7, 3, 1, 2],
  [2, 3, 1, 5, 7, 4, 6, 9, 8],
  [9, 6, 8, 2, 3, 1, 5, 7, 4],
  [5, 7, 4, 9, 6, 8, 2, 3, 1],
]

const invalidBoard = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [3, 1, 2, 8, 4, 5, 9, 6, 7],
  [6, 9, 7, 3, 1, 2, 8, 4, 5],
  [8, 4, 5, 6, 9, 7, 3, 1, 2],
  [2, 3, 1, 5, 7, 4, 6, 9, 8],
  [9, 6, 8, 2, 3, 1, 5, 7, 4],
  [5, 7, 4, 9, 3, 8, 2, 3, 1],
]

const incompleteValidBoard = [
  [2, 0, 0, 3, 0, 0, 4, 0, 0],
  [0, 1, 0, 0, 2, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 6, 0, 0, 7, 0, 0],
  [0, 4, 0, 0, 5, 0, 0, 6, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [8, 0, 0, 9, 0, 0, 1, 0, 0],
  [0, 7, 0, 0, 8, 0, 0, 9, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const divider = '----------------------------------------\n'

function testValidate() {
  process.stdout.write(colorize(92, '\n\nTEST OF VALIDATE\n'))
  process.stdout.write(colorize(92, divider))
  process.stdout.write(`VALID     : ${validate(validBoard)}\n`)
  process.stdout.write(`INVALID   : ${validate(invalidBoard)}\n`)
  process.stdout.write(`INCOMPLETE: ${validate(incompleteValidBoard)}`)
}

function testSudoku() {
  for (let i = 0; i < 2; i++) {
    const type = i === 0 ? 'SCRATCH' : 'INCOMPLETE'
    const start = new Date().getTime()
    const result = i === 0 ? solve() : solve(incompleteValidBoard)
    const end = new Date().getTime()
    process.stdout.write(colorize(92, `\n\nTEST OF SOLVER FROM ${type}\n`))
    process.stdout.write(colorize(92, divider))
    process.stdout.write(`COSTS : ${end - start} milliseconds\n`)
    process.stdout.write(`PASS  : ${validate(result)}\n`)
    if (i === 0) {
      print(result)
    } else {
      // Check if the original input board is intact
      let isOriginIntact = true
      for (let y = 0; y < 9; y++) {
        if (!isOriginIntact) {
          break
        }
        for (let x = 0; x < 9; x++) {
          const n = incompleteValidBoard[y][x]
          if (n !== 0 && n !== result[y][x]) {
            isOriginIntact = false
            break
          }
        }
      }
      process.stdout.write(`INTACT: ${isOriginIntact}\n`)
      print(result, incompleteValidBoard)
    }
  }
}

function bulkTestSudoku() {
  const ITERATION = 500
  for (let i = 0; i < 2; i++) {
    let isAllValid = true
    const type = i === 0 ? 'SCRATCH' : 'INCOMPLETE'
    const start = new Date().getTime()
    for (let i = 0; i < ITERATION; i++) {
      const result = i === 0 ? solve() : solve(incompleteValidBoard)
      if (validate(result)) {
        continue
      } else {
        isAllValid = false
        break
      }
    }
    const end = new Date().getTime()
    process.stdout.write(colorize(92, `\n\nTEST OF SOLVER BULK RUN FROM ${type}\n`))
    process.stdout.write(colorize(92, divider))
    process.stdout.write(`ITERATIONS: ${ITERATION}\n`)
    process.stdout.write(`COSTS     : ${end - start} milliseconds\n`)
    process.stdout.write(`PER RUN   : ${(end - start) / ITERATION} milliseconds\n`)
    process.stdout.write(`PASS      : ${isAllValid}\n`)
  }
}

testValidate()
testSudoku()
bulkTestSudoku()
