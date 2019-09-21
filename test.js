const {
  pick,
  getBlockRange,
  multiplyArray,
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

const incompleteBoard = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function testPick(array) {
  const iterations = 9999
  const counter = new Array(array.length).fill(0)

  for (let i = 0; i < iterations; i += 1) {
    const p = pick(...array)
    counter[array.indexOf(p)] += 1
  }

  const total = counter.reduce((a, n) => a + n, 0)

  console.log("Test of pick function:")
  counter.forEach((num, i) => {
    console.log('Percent of ' + array[i] + ': ' + num / total)
  })
}

function testGetBlockRange() {
  console.log("Test of getBlockRange function:")
  for (let i = 1; i <= 9; i += 1) {
    console.log(getBlockRange(i))
  }
}
 
function testValidate() {
  console.log("Test of valiate function:")
  console.log('This is a valid board: ' + validate(validBoard))
  console.log('This is an invalid board: ' + validate(invalidBoard))
}

function testMultiplyArray() {
  const a = [1,2,3]
  const b = [4,5,6]
  console.log("Test of multiplyArray function:")
  console.log(a, b)
  console.log(multiplyArray(a, b))
}

function testPrintBoard() {
  console.log("Test of printBoard function:")
  printBoard(validBoard)
}

function testSudoku(board) {
  const result = sudoku(board)
  printBoard(result)
  console.log(validate(result))
}

// testPick([1, 2, 3])
// testGetBlockRange()
// testValidate()
// testMultiplyArray()
// testPrintBoard()
testSudoku()
