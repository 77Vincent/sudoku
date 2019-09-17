const SCALE = 9
const board = new Array(SCALE)
  .fill()
  .map(row => new Array(SCALE).fill(0))

function random(exclusion = []) {
  const max = SCALE
  const min = 1

  const ran = () => min + Math.floor(Math.random() * (max - min + 1))

  let r = ran()

  while (exclusion.includes(r)) {
    r = ran()
  }

  return r
}

function doku(board) {
  let existingR = []
  let existingC = []
  let existingB = []
  let existing = []

  for (let r = 0; r < SCALE; r += 1) {
    for (let c = 0; c < SCALE; c += 1) {
      existingR = board[r]
      existingC = board.map(row => row[c])
      existing = Array.from(new Set([].concat(existingR, existingC, existingB)))

      if (existing.length === 10) {
      } else {
        board[r][c] = random(existing)
      }
    }
  }

  return board
}

console.log(doku(board))

