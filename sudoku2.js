const SCALE = 9
const board = new Array(SCALE)
  .fill()
  .map(row => new Array(SCALE).fill(0))

function getRange(i) {
  let r = i%3 || 3
  let c = Math.ceil(i/3)

  return {
    r: [(r - 1) * 3, r * 3 - 1],
    c: [(c - 1) * 3, c * 3 - 1],
  }
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function doku2(board) {
  const nums = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], } 

  for (let num = 1; num <= 9; num += 1) {
    for (let i = 0; i < 9; i += 1) {
      const range = getRange(i + 1)

      let r = random(range.r[0], range.r[1])
      let c = random(range.c[0], range.c[1])

      board[r][c] = num
    }
  }
  return board
}

console.log(doku2(board))
