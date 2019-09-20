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
    const range = getBlockRange(i + 1)
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

function getBlockRange(i) {
  let x = i%3 || 3
  let y = Math.ceil(i/3)

  const baseX = (x - 1) * 3
  const baseY = (y - 1) * 3

  return {
    x: [baseX, baseX + 1, baseX + 2],
    y: [baseY, baseY + 1, baseY + 2],
  }
}

function multiplyArray(arrayA = [], arrayB = []) {
  const multiplication = []

  arrayA.forEach(a => {
    arrayB.forEach(b => {
      multiplication.push([a, b])
    }) 
  })

  return multiplication
}

function pick(...args) {
  const seed = 1 + Math.floor(Math.random() * args.length)

  return args[seed - 1]
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
  multiplyArray,
  pick,
  printBoard,
  validate,
}
