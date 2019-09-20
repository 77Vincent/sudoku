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
  board = board || new Array(9).fill().map(() => new Array(9).fill(0))
  const cors = []
  const existing = []

  // record the existing ones
  board.map((row, y) => row.map((num, x) => {
    if (num !== 0) {
      existing.push({
        value: num,
        cor: [x, y]
      })
    }
  }))

  for (let suIndex = 0; suIndex < 9; suIndex += 1) {
    let su = suIndex + 1
    cors[suIndex] = []

    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      const range = getBlockRange(blockIndex + 1)
      const corRange = multiplyArray(range.x, range.y)

      // Skip blocks where there is already c su filled in
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
        suIndex -= 2
        board = board.map(row => row.map(num => num === su ? 0 : num))
        board = board.map(row => row.map(num => num === su - 1 ? 0 : num))
        break
      } else {
        cors[suIndex].push(pick(...availables))
        const x = cors[suIndex][blockIndex][0]
        const y = cors[suIndex][blockIndex][1]
        board[y][x] = su
      }
    }
  }

  return board 
}

module.exports = sudoku 
