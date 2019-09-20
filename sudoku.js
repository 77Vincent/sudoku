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

function sudoku(board) {
  board = board || new Array(9)
    .fill()
    .map(row => new Array(9).fill(0))

  for (let sui = 0; sui < 9; sui += 1) {
    let su = sui + 1
    let cor = []

    for (let i = 0; i < 9; i += 1) {
      const range = getBlockRange(i + 1)
      const corRange = multiplyArray(range.x, range.y)

      // Skip blocks where there is already a su filled in
      if (corRange.some(cor => board[cor[1]][cor[0]] === su)) {
        continue
      }

      const availables = corRange
        // Check occupation
        .filter(cor => board[cor[1]][cor[0]] === 0)
        // Check column conflict
        .filter(cor => !board.map(row => row[cor[0]]).includes(su))
        // Check row conflict
        .filter(cor => !board[cor[1]].includes(su))

      if (availables.length === 0) {
        sui -= 2
        board = board.map(row => row.map(num => num === su ? 0 : num))
        board = board.map(row => row.map(num => num === su - 1 ? 0 : num))
        break

      } else {
        cor.push(pick(...availables))
        board[cor[i][1]][cor[i][0]] = su
      }
    }
  }

  return board 
}

module.exports = sudoku 
