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
  [1, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 2, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 3, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 4, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 8, 0, 6, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 7, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 8, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 9],
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
    const resultFromScratch = sudoku()
    const end = new Date().getTime()
    const output = `Resolution from blank board: ${validate(resultFromScratch)}\n`
    const cost = `Cost: ${end - start} milliseconds`
    console.log(output + cost)
    printBoard(resultFromScratch)
  }, 0);
  setTimeout(() => {
    const start = new Date().getTime()
    const resultFromIncomplete = sudoku(incompleteValidBoard)
    const end = new Date().getTime()
    const output = `Resolution from incomplete board: ${validate(resultFromIncomplete)}\n`
    const cost = `Cost: ${end - start} milliseconds`
    console.log(output + cost)
    printBoard(resultFromIncomplete)
  }, 0);
}

// testGetBlockRange()
// testValidate()
// testPrintBoard()
testSudoku()
