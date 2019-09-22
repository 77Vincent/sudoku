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
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 2, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 5, 0, 0, 6, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 8, 0, 0, 9, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const divider = '\n================== TEST BEGIN ==================\n'

function testValidate() {
  const valid = `VALID     : ${validate(validBoard)}\n`
  const invalid = `INVALID   : ${validate(invalidBoard)}\n`
  const incompleteValid = `INCOMPLETE: ${validate(incompleteValidBoard)}`
  process.stdout.write(colorize(92, divider))
  process.stdout.write(valid + invalid + incompleteValid)
}

function testSudoku() {
  setTimeout(() => {
    const start = new Date().getTime()
    const result = solve()
    const end = new Date().getTime()
    const output = `FROM : blank / ${validate(result)}\n`
    const cost = `COSTS: ${end - start} milliseconds\n`
    process.stdout.write(colorize(92, divider))
    process.stdout.write(output + cost)
    print(result)
  }, 0);
  setTimeout(() => {
    const start = new Date().getTime()
    const result = solve(incompleteValidBoard)
    const end = new Date().getTime()
    const output = `FROM : incomplete / ${validate(result)}\n`
    const cost = `COSTS: ${end - start} milliseconds\n`
    process.stdout.write(colorize(92, divider))
    process.stdout.write(output + cost)
    print(result)
  }, 0);
}

function bulkTestSudoku(usingBlank = true) {
  const ITERATION = 500
  let isAllValid = true
  const start = new Date().getTime()
  for (let i = 0; i < ITERATION; i++) {
    const result = usingBlank ? solve() : solve(incompleteValidBoard)
    if (validate(result)) {
      continue
    } else {
      isAllValid = false
      break
    }
  }
  const end = new Date().getTime()

  const stdoutTitle = `FROM      : ${usingBlank ? 'blank' : 'imcomplete'}\n`
  const stdoutInfo = `ITERATIONS: ${ITERATION}\nPER RUN   : ${(end - start) / ITERATION} milliseconds\n`
  const stdoutPass = `PASS      : ${isAllValid}`
  process.stdout.write(colorize(92, divider))
  process.stdout.write(stdoutTitle + stdoutInfo + stdoutPass)
}

testValidate()
testSudoku()
bulkTestSudoku()
