/**
 * Sudoku solver
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */

function sudoku(board) {
  board = board || new Array(9).fill().map(() => new Array(9).fill(0))
  const groupedBySu = [ [], [], [], [], [], [], [], [], [] ]
  const existing = []
  const blockCors = [
    [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
    [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]],
    [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2]],
    [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]],
    [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]],
    [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5]],
    [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8]],
    [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8]],
    [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]],
  ]
  // const blockMap = [
  //   [0, 0, 0, 1, 1, 1, 2, 2, 2],
  //   [0, 0, 0, 1, 1, 1, 2, 2, 2],
  //   [0, 0, 0, 1, 1, 1, 2, 2, 2],
  //   [3, 3, 3, 4, 4, 4, 5, 5, 5],
  //   [3, 3, 3, 4, 4, 4, 5, 5, 5],
  //   [3, 3, 3, 4, 4, 4, 5, 5, 5],
  //   [6, 6, 6, 7, 7, 7, 8, 8, 8],
  //   [6, 6, 6, 7, 7, 7, 8, 8, 8],
  //   [6, 6, 6, 7, 7, 7, 8, 8, 8],
  // ]

  const pick = (...args) => {
    const seed = 1 + Math.floor(Math.random() * args.length)
    return args[seed - 1]
  }

  for (let y = 0, len = board.length; y < len; y++) {
    const row = board[y]
    for (let x = 0, len = row.length; x < len; x++) {
      if (row[x] !== 0) {
        // record the existing ones which are non-zero numbers
        existing.push([x, y])
      }
    }
  }

  let undo = 1
  let stuckAt = null
  // Actual solving
  for (let suIndex = 0; suIndex < 9; suIndex += 1) {
    const su = suIndex + 1

    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      // Skip blocks where su is already filled in
      // And fill the su into the groupedBySu
      const blockCor = blockCors[blockIndex]
      let isExisting = false
      for (let i = 0; i < blockCor.length; i++) {
        const cor = blockCor[i]
        if (board[cor[1]][cor[0]] === su) {
          groupedBySu[suIndex][blockIndex] = cor
          isExisting = true
          break
        }
      }

      if (isExisting) {
        continue
      }

      // Brute force
      const availables =  blockCors[blockIndex] 
        // Check occupation
        .filter(cor => board[cor[1]][cor[0]] === 0)
        // Check column conflict
        .filter(cor => !board.map(row => row[cor[0]]).includes(su))
        // Check row conflict
        .filter(cor => !board[cor[1]].includes(su))

      if (availables.length === 0) {
        const currentFilledLength = groupedBySu[suIndex].length
        undo = String(stuckAt) == [suIndex, blockIndex] ? undo + 1 : 1 

        if (undo > 4 && suIndex >= 1) {
          groupedBySu[suIndex].forEach(cor => {
            if (!existing.some(existingCor => String(existingCor) === String(cor))) {
              board[cor[1]][cor[0]] = 0
            }
          })
          groupedBySu[suIndex - 1].forEach(cor => {
            if (!existing.some(existingCor => String(existingCor) === String(cor))) {
              board[cor[1]][cor[0]] = 0
            }
          })
          groupedBySu[suIndex] = []
          groupedBySu[suIndex - 1] = []
          suIndex -= 2
          break
        }

        stuckAt = [suIndex, blockIndex]

        // Undo on the current su
        if (currentFilledLength >= undo) {
          for (let i = currentFilledLength - 1; i > currentFilledLength - 1 - undo; i--) {
            const cor = groupedBySu[suIndex][i]
            if (!existing.some(existingCor => String(existingCor) === String(cor))) {
              board[cor[1]][cor[0]] = 0
            }
          }
          groupedBySu[suIndex] = groupedBySu[suIndex].slice(0, currentFilledLength - undo)
          blockIndex = blockIndex - undo - 1 
        } else {
          const undoOnPreviousRow = undo - currentFilledLength
          // Undo on the current su
          for (let i = 0; i < currentFilledLength; i++) {
            const cor = groupedBySu[suIndex][i]
            if (!existing.some(existingCor => String(existingCor) === String(cor))) {
              board[cor[1]][cor[0]] = 0
            }
          }
          // Undo on the previous su
          for (let i = 8; i > 8 - undoOnPreviousRow; i--) {
            const cor = groupedBySu[suIndex - 1][i]
            if (!existing.some(existingCor => String(existingCor) === String(cor))) {
              board[cor[1]][cor[0]] = 0
            }
          }
          groupedBySu[suIndex] = []
          groupedBySu[suIndex - 1] = groupedBySu[suIndex - 1].slice(0, 9 - undoOnPreviousRow)
          suIndex -= 2
          break
        }
      } else {
        const cor = pick(...availables)
        groupedBySu[suIndex][blockIndex] = cor
        board[cor[1]][cor[0]] = su
      }
    }
  }

  return board 
}

module.exports = sudoku 
