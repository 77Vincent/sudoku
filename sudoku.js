/**
 * Sudoku solver
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */

const {
  getBlockRange,
  pick,
  multiplyArray,
} = require('./utilities')

function sudoku(board) {
  board = board || new Array(9).fill().map(() => new Array(9).fill(0))
  const groupedBySu = new Array(9).fill().map(() => new Array(9).fill(0))
  const blockCors = []
  const existing = []

  // Block index starts from 1
  for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
    const { x, y } = getBlockRange(blockIndex)
    blockCors.push(multiplyArray(x, y))
  }

  // record the existing ones
  board.forEach((row, y) => row.forEach((num, x) => {
    if (num !== 0) {
      const blockIndex = whichBlock(x, y)
      existing.push([x, y])
    }
  }))

  // Actual solving
  for (let suIndex = 0; suIndex < 9; suIndex += 1) {
    const su = suIndex + 1

    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      // Skip blocks where su is already filled in
      if (blockCors[blockIndex].some(cor => board[cor[1]][cor[0]] === su)) {
        continue
      }

      const availables =  blockCors[blockIndex] 
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
        const cor = pick(...availables)
        groupedBySu[suIndex][blockIndex] = cor
        const x = groupedBySu[suIndex][blockIndex][0]
        const y = groupedBySu[suIndex][blockIndex][1]
        board[y][x] = su
      }
    }
  }

  return board 
}

module.exports = sudoku 
