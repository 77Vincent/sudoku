/**
 * Sudoku solver
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */

const {
  getBlockRange,
  pick,
  multiplyArray,
  validate,
  printBoard,
} = require('./utilities')

function solve() {
  const SCALE = 9
  let board = new Array(SCALE)
    .fill()
    .map(row => new Array(SCALE).fill(0))

  function getAvailables(su, i) {
    let range = getBlockRange(i + 1)
    let corRange = multiplyArray(range.x, range.y)
    return corRange
      // Check occupation
      .filter(cor => board[cor[1]][cor[0]] === 0)
      // Check column conflict
      .filter(cor => !board.map(row => row[cor[0]]).includes(su))
      // Check row conflict
      .filter(cor => !board[cor[1]].includes(su))
  }

  for (let sui = 0; sui < 9; sui += 1) {
    let su = sui + 1

    for (let i = 0; i < 9; i += 1) {
      let availables = getAvailables(su, i)

      while (availables.length === 0) {
        // Restart from the first item of the current number
        i = 0
        board = board.map(row => row.map(num => num === su ? 0 : num))
        availables = getAvailables(su, i)
      }

      let cor = pick(...availables)
      board[cor[1]][cor[0]] = su
    }
  }

  return board 
}

let resolution = solve()

// while (!validate(testBoard)) {
//   console.log(testBoard)
//   testBoard = solve(initialBoard)
// }

console.log(printBoard(resolution))
console.log(validate(resolution))
