/**
 * Sudoku solver & generator
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */
import { blockCors, blockIndexMap } from './utilities'

function solve(inputBoard = [[], [], [], [], [], [], [], [], []]) {
  // copy the origin board
  const board = inputBoard.map(row => row.map(n => n))
  const pick = (...args) => {
    const seed = 1 + Math.floor(Math.random() * args.length)
    return args[seed - 1]
  }
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // If it did not end over this amount of tests, end the solver
  const threshold = 10000

  let tried = 0
  let test = 0 
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const su = board[y][x]
      if (su) {
        continue
      }
      if (test > threshold) {
        return false
      }

      const picked = blockCors[blockIndexMap[y][x]].map(cor => board[cor[1]][cor[0]])
      const availables = range.filter(n =>
        // Filter out row existing
        !board[y].includes(n)
        // Filter out column existing
        && !board.map(row => row[x]).includes(n)
        // Filter out block existing
        && !picked.includes(n)
      )

      if (availables.length === 0) {
        tried++

        if (tried >= (y * 9 + x)) {
          for (let i = 0; i < y; i++) {
            board[i] = inputBoard[i].map(n => n)
          }
          tried = 0
          y = -1
          test++
          break
        }

        x = x - tried

        if (x >= 0) {
          board[y].splice(x)
          board[y].push(...inputBoard[y].map(n => n).splice(x))
          x--
          continue
        } else {
          for (let i = 0; i < Math.abs(Math.ceil(x/9)); i++) {
            board[y] = inputBoard[y].map(n => n)
            y--
          }
          x = 9 + x%9
          board[y].splice(x)
          board[y].push(...inputBoard[y].map(n => n).splice(x))
          y--
          break
        }
      } else {
        board[y][x] = su || pick(...availables)
      }
    }
  }

  return board
}

export default solve
