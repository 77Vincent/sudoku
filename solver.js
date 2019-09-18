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

const SCALE = 9
const initialBoard = new Array(SCALE)
  .fill()
  .map(row => new Array(SCALE).fill(0))


function solve(board) {
  const sus = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }

  for (let su = 1; su <= 9; su += 1) {
    for (let i = 0; i < 9; i += 1) {
      const range = getBlockRange(i + 1)
      const corRange = multiplyArray(range.x, range.y)

      let cor = pick(...corRange)

      // if su is aleady in the block
      let t = 1

      sus[su][i] = cor
    }
  }
  // render the sus into the board
  Object.keys(sus).map(su => {
    sus[su].forEach(cor => {
      let x = cor[0]
      let y = cor[1]
      board[y][x] = Number(su)
    })
  })
  return board 
}

let testBoard = solve(initialBoard)

// while (!validate(testBoard)) {
//   console.log(testBoard)
//   testBoard = solve(initialBoard)
// }

console.log(testBoard)
console.log(validate(testBoard))
