function validate(board = []) {
  let isRowValid = true
  let isColumnValid = true
  let isBlockValid = true

  for (let i = 0; i < 9; i += 1) {
    // Eliminate zero
    board[i] = board[i].filter(i => i !== 0)
    
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
    const range = getBlockRange(i)
    const block = board 
      .slice(range.x[0], range.x[2] + 1)
      .reduce(
        (a, row) => a.concat(row.slice(range.y[0], range.y[2] + 1)),
        []
      )
    if (new Set(block).size !== 9) {
      isBlockValid = false
      break
    }
  }
  return isRowValid && isColumnValid && isBlockValid
}

function getBlockRange(blockIndex) {
  blockIndex += 1
  let x = blockIndex%3 || 3
  let y = Math.ceil(blockIndex/3)

  const baseX = (x - 1) * 3
  const baseY = (y - 1) * 3

  return {
    x: [baseX, baseX + 1, baseX + 2],
    y: [baseY, baseY + 1, baseY + 2],
  }
}

function printBoard(board) {
  const borderRow = new Array(9).fill('+---').map(v => v).join('') + '+\n'
  let borderColumn = ''
  let output = ''

  for (let y = 0; y < 9; y += 1) {
    output += borderRow

    borderColumn = ''

    for (let x = 0; x < 9; x += 1) {
      borderColumn += '| ' + (board[y][x] || ' ') + ' '
    }
    borderColumn += '|\n'

    output += borderColumn
  }
  output += borderRow
  console.log(output)
}

module.exports = {
  getBlockRange, 
  printBoard,
  validate,
}
