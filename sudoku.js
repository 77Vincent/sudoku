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
  const groupedBySu = [ [], [], [], [], [], [], [], [], [] ]
  const skippedBlocks = [ [], [], [], [], [], [], [], [], [] ]
  const blockCors = []
  const existing = []
  const blockMap = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
  ]
  for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
    const { x, y } = getBlockRange(blockIndex)
    blockCors.push(multiplyArray(x, y))
  }

  for (let y = 0, len = board.length; y < len; y++) {
    const row = board[y]
    for (let x = 0, len = row.length; x < len; x++) {
      if (row[x] !== 0) {
        // Record the block index for existing numbers
        skippedBlocks[row[x] - 1].push(blockMap[y][x])
        // record the existing ones which are non-zero numbers
        existing.push([x, y])
      }
    }
  }

  // Actual solving
  for (let suIndex = 0; suIndex < 9; suIndex += 1) {
    const su = suIndex + 1

    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      // Skip blocks where su is already filled in
      if (skippedBlocks[suIndex].includes(blockIndex)) {
        continue
      }
      // if (blockCors[blockIndex].some(cor => board[cor[1]][cor[0]] === su)) {
      //   continue
      // }

      const availables =  blockCors[blockIndex] 
        // Check occupation
        .filter(cor => board[cor[1]][cor[0]] === 0)
        // Check column conflict
        .filter(cor => !board.map(row => row[cor[0]]).includes(su))
        // Check row conflict
        .filter(cor => !board[cor[1]].includes(su))

      if (availables.length === 0) {
        let suCors = groupedBySu[suIndex]

        for (let i = 0, len = suCors.length; i < len; i++) {
          const cor = suCors[i]
          if (
            !existing.some(existingCor => String(existingCor) === String(cor))
          ) {
            board[cor[1]][cor[0]] = 0
          }
        }
        groupedBySu[suIndex] = []
        suIndex -= 1

        if (suIndex > 0) {
          suCors = groupedBySu[suIndex]
          for (let i = 0, len = suCors.length; i < len; i++) {
            const cor = suCors[i]
            if (
              !existing.some(existingCor => String(existingCor) === String(cor))
            ) {
              board[cor[1]][cor[0]] = 0
            }
          }

          groupedBySu[suIndex] = []
          suIndex -= 1
        }

        break
      } else {
        const cor = pick(...availables)
        groupedBySu[suIndex].push(cor)
        board[cor[1]][cor[0]] = su
      }
    }
  }

  return board 
}

module.exports = sudoku 
