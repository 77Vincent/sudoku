/**
 * Sudoku solver & generator
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */
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
const blockIndexMap = [
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

function colorize(color, output) {
  return ['\033[', color, 'm', output, '\033[0m'].join('');
}

function validate(board) {
  if (!board) {
    return false
  }
  for (let i = 0; i < 9; i += 1) {
    // Validate row
    if (new Set(board[i].filter(n => n !== 0)).size !== 9) {
      return false
    }

    // Validate column
    if (new Set(board.map(row => row[i]).filter(n => n !== 0)).size !== 9) {
      return false
    }

    // Validate block
    if (new Set(blockCors[i].map(cor => board[cor[1]][cor[0]]).filter(n => n !== 0)).size !== 9) {
      return false
    }
  }
  return true 
}

function print(board, inputBoard) {
  const ROW = '+---+---+---+---+---+---+---+---+---+\n'
  const BORDER_COLOR = 92
  const REGULAR_COLOR = 90
  const INPUT_NUM_COLOR = 95

  for (let y = 0; y < 9; y += 1) {
    if (y%3 === 0) {
      process.stdout.write(colorize(BORDER_COLOR, ROW))
    } else {
      for (let i = 0; i < 3; i++) {
        process.stdout.write(colorize(BORDER_COLOR, '+'))
        process.stdout.write(colorize(REGULAR_COLOR, '---+---+---'))
      }
      process.stdout.write(colorize(BORDER_COLOR, '+\n'))
    }
    for (let x = 0; x < 9; x += 1) {
      process.stdout.write(colorize(x%3 === 0 ? BORDER_COLOR : REGULAR_COLOR, '|'))
      process.stdout.write(colorize(
        inputBoard && inputBoard[y][x] !== 0 ? INPUT_NUM_COLOR : 0,
        ` ${board[y][x]} `
      ))
    }
    process.stdout.write(colorize(BORDER_COLOR, '|\n'))
  }
  process.stdout.write(colorize(BORDER_COLOR, ROW))
}


function solve(inputBoard) {
  // copy the origin board
  const board = inputBoard
    ? inputBoard.map(row => row.map(num => num))
    : [ [], [], [], [], [], [], [], [], [] ]
  const pick = (...args) => {
    const seed = 1 + Math.floor(Math.random() * args.length)
    return args[seed - 1]
  }
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  let tried = 0
  let lastChosen = null
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const su = board[y][x]
      if (su) { continue }

      let availables =  range
        // Filter out row existing
        .filter(num => !board[y].includes(num))
        // Filter out column existing
        .filter(num => !board.map(row => row[x]).includes(num))
      
      // Filter out block existing
      const picked = blockCors[blockIndexMap[y][x]].map(cor => board[cor[1]][cor[0]])
      availables = availables.filter(num => !picked.includes(num) && num !== lastChosen)
      
      if (availables.length === 0 && y >= 1) {
        tried += 1 
        x = x - tried

        if (tried >= 5) { // 5 is the best try
          board[y] = []
          board[y - 1] = []
          tried = 0
          y -= 2
          lastChosen = null
          break
        } else {
          if (x >= 0) {
            lastChosen = board[y][x]
            board[y].splice(x)
            x--
            continue
          } else {
            board[y] = []
            lastChosen = board[y - 1][8 + x]
            board[y - 1].splice(9 + x)
            y -= 2
            break
          }
        }
      } else if (availables.length === 0 && y === 0) {
        tried += 1 
        x = x - tried >= 0 ? x - tried : 0

        lastChosen = board[y][x]
        board[y].splice(x)
        x--
        continue
      } else {
        board[y][x] = su || pick(...availables)
        lastChosen = null
      }
    }
  }

  return board 
}

module.exports = {
  colorize,
  print,
  solve,
  validate,
}
