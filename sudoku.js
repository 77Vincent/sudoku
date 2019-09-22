/**
 * Sudoku solver
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */

function sudoku(inputBoard) {
  // copy the origin board
  const board = inputBoard
    ? inputBoard.map(row => row.map(num => num))
    : [ [], [], [], [], [], [], [], [], [] ]
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

        if (tried >= 4) {
          board[y] = []
          board[y - 1] = []
          tried = 0
          y -= 2
          lastChosen = null
          break
        } else {
          if (x >= 0) {
            lastChosen = board[y][x]
            board[y].splice(x + 1)
            continue
          } else {
            board[y] = []
            board[y - 1].splice(9 + x)
            lastChosen = board[y - 1][8 + x]
            y -= 2
            break
          }
        }
      } else if (availables.length === 0 && y === 0) {
        tried += 1 
        x = x - tried >= 0 ? x - tried : 0
        lastChosen = board[y][x]
        board[y].splice(x + 1)
        continue
      } else {
        board[y][x] = su || pick(...availables)
        lastChosen = null
      }
    }
  }

  return board 
}

module.exports = sudoku 
