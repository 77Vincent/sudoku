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
} = require('./utilities')

function solve() {
  const SCALE = 9
  const board = new Array(SCALE)
    .fill()
    .map(row => new Array(SCALE).fill(0))

  const sus = new Array(9).fill([])

  for (let su = 0; su < 9; su += 1) {
    for (let i = 0; i < 9; i += 1) {
      const range = getBlockRange(i + 1)
      const corRange = multiplyArray(range.x, range.y)

      let cor = pick(...corRange)

      // if su is aleady in the block

      sus[su][i] = cor
      board[cor[1]][cor[0]] = su + 1
    }
  }

  return board 
}

let resolution = solve()

// while (!validate(testBoard)) {
//   console.log(testBoard)
//   testBoard = solve(initialBoard)
// }

console.log(resolution)
console.log(validate(resolution))
