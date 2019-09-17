const { initialBoard, validBoardA, getBlockRange } = require('./utilities')

function validate(board = []) {
  let isRowValid = true
  let isColumnValid = true
  let isBlockValid = true

  for (let i = 0; i < 9; i += 1) {
    // Validate row
    if ( new Set(board[i]).size !== 9 ) {
      isRowValid = false
      break
    }

    // Validate column
    const column = board.map(row => {
      return row[i]
    })
    if (new Set(column).size !== 9) {
      isColumnValid = false
      break
    }

    // Validate block
    const range = getBlockRange(i + 1)
    const block = board 
      .slice(range.c[0], range.c[1] + 1)
      .reduce(
        (a, row) => a.concat(row.slice(range.r[0], range.r[1] + 1)),
        []
      )
    if (new Set(block).size !== 9) {
      isBlockValid = false
      break
    }
  }
  return isRowValid && isColumnValid && isBlockValid
}

module.exports = validate
