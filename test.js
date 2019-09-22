const {
  getBlockRange,
  validate,
  printBoard,
} = require('./utilities')

const sudoku = require('./sudoku')

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

function testGetBlockRange() {
  console.log('Test of getBlockRange function:')
  for (let i = 1; i <= 9; i += 1) {
    console.log(getBlockRange(i))
  }
}
 
function testValidate() {
  console.log('Test of valiate function:')
  console.log('This is a valid board: ' + validate(validBoard))
  console.log('This is an invalid board: ' + validate(invalidBoard))
}

function testPrintBoard() {
  console.log('Test of printBoard function:')
  printBoard(validBoard)
}

function testSudoku() {
  setTimeout(() => {
    const start = new Date().getTime()
    const result = sudoku()
    const end = new Date().getTime()
    const output = `Resolution from blank board: ${validate(result)}\n`
    const cost = `Cost: ${end - start} milliseconds`
    console.log(output + cost)
    printBoard(result)
  }, 0);
  setTimeout(() => {
    const start = new Date().getTime()
    const result = sudoku(incompleteValidBoard)
    const end = new Date().getTime()
    const output = `Resolution from incomplete board: ${validate(result)}\n`
    const cost = `Cost: ${end - start} milliseconds`
    console.log(output + cost)
    printBoard(result)
  }, 0);
}

function testSudokuMassively(usingBlank = true) {
  const ITERATION = 100
  let isAllValid = true
  const start = new Date().getTime()
  for (let i = 0; i < ITERATION; i++) {
    const result = usingBlank ? sudoku() : sudoku(incompleteValidBoard)
    if (validate(result)) {
      printBoard(result)
    } else {
      isAllValid = false
      break
    }
  }
  const end = new Date().getTime()
  const stdoutTitle = `Running from ${usingBlank ? 'blank' : 'pre-filled'} board\n`
  const stdoutInfo = `Iterations: ${ITERATION}\nPer run: ${(end - start) / ITERATION} milliseconds\n`
  const stdoutPass = `All passed: ${isAllValid}`
  console.log(stdoutTitle + stdoutInfo + stdoutPass)
}

// testGetBlockRange()
// testValidate()
// testPrintBoard()
// testSudoku()
testSudokuMassively()
