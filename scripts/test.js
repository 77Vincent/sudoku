const solve = require('../src/main')

const {
  colorize,
  print,
  validate,
} = require('../src/utilities')

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
  [0, 0, 3, 0, 0, 4, 0, 0, 5],
  [5, 0, 0, 6, 0, 0, 7, 0, 0],
  [0, 4, 0, 0, 5, 0, 0, 6, 0],
  [0, 0, 6, 0, 0, 7, 0, 0, 8],
  [8, 0, 0, 9, 0, 0, 1, 0, 0],
  [0, 7, 0, 0, 8, 0, 0, 9, 0],
  [0, 0, 9, 0, 0, 1, 0, 0, 2],
]

const ITERATION = 500
const COLOR_INFO = 92
const COLOR_VALID = 92
const COLOR_INVALID = 91
const TEXT = {
  VALID: 'valid',
  INVALID: 'invalid',
  SCRATCH: 'scratch',
  INCOMPLETE: 'incomplete',
  MS: 'ms',
}
const TEST_SUIT = ['SCRATCH', 'INCOMPLETE']

function colorTrueOrFalse(result) {
  return colorize(result ? COLOR_VALID : COLOR_INVALID, result)
}

function divider(info = '') {
  const title = `\n\nTEST OF ${info.toUpperCase()}\n`
  const divider = '----------------------------------------\n'
  return colorize(COLOR_INFO, title + divider)
}

function checkIntegrity(board, origin) {
  if (!board) {
    return false
  }
  if (!origin) {
    return true
  }
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const n = origin[y][x]
      if (n !== 0 && n !== board[y][x]) {
        return false
      }
    }
  }
  return true
}

function testValidate() {
  process.stdout.write(divider('validate function'))
  process.stdout.write(`IS VALID BOARD ${TEXT.VALID.toUpperCase()}       : `)
  process.stdout.write(`${colorTrueOrFalse(validate(validBoard))}\n`)
  process.stdout.write(`IS INVALID BOARD ${TEXT.INVALID.toUpperCase()}   : `)
  process.stdout.write(`${colorTrueOrFalse(!validate(invalidBoard))}\n`)
  process.stdout.write(`IS INCOMPLETE BOARD ${TEXT.INVALID.toUpperCase()}: `)
  process.stdout.write(`${colorTrueOrFalse(!validate(incompleteValidBoard))}\n`)
}

function testSudoku() {
  process.stdout.write(divider(`test of sudoku`))
  TEST_SUIT.forEach(type => {
    const start = new Date().getTime()
    const result = solve(type === TEST_SUIT[0] ? undefined : incompleteValidBoard)
    const end = new Date().getTime()

    process.stdout.write(`COSTS : ${end - start} ${TEXT.MS}\n`)
    process.stdout.write(`VALID : `)
    process.stdout.write(`${colorTrueOrFalse(validate(result))}\n`)
    switch (type) {
      case TEST_SUIT[0]:
        print(result)
        break
      case TEST_SUIT[1]:
        process.stdout.write(`INTACT: `)
        process.stdout.write(`${colorTrueOrFalse(checkIntegrity(result, incompleteValidBoard))}\n`)
        print(result, incompleteValidBoard)
    }
  })
}

function bulkTestSudoku() {
  TEST_SUIT.forEach(type => {
    setTimeout(() => {
      let isAllValid = []
      let isAllIntact = []
      let result = null

      const start = new Date().getTime()
      for (let i = 0; i < ITERATION; i++) {
        switch (type) {
          case TEST_SUIT[0]:
            result = solve()
            isAllValid.push(validate(result))
            isAllIntact.push(checkIntegrity(result))
            break
          case TEST_SUIT[1]:
            result = solve(incompleteValidBoard)
            isAllValid.push(validate(result))
            isAllIntact.push(checkIntegrity(result, incompleteValidBoard))
        }
      }
      const end = new Date().getTime()
      const total = end - start

      process.stdout.write(divider(`bulk running from ${type}`))
      process.stdout.write(`ITERATIONS: ${ITERATION}\n`)
      process.stdout.write(`COSTS     : ${total} ${TEXT.MS}\n`)
      process.stdout.write(`PER RUN   : ${(total) / ITERATION} ${TEXT.MS}\n`)
      process.stdout.write(`ALL VALID : `)
      process.stdout.write(`${colorTrueOrFalse(isAllValid.reduce((a, b) => a && b))}\n`)
      process.stdout.write(`ALL INTACT : `)
      process.stdout.write(`${colorTrueOrFalse(isAllIntact.reduce((a, b) => a && b))}\n`)
    }, 0)
  })
}

testValidate()
testSudoku()
bulkTestSudoku()
