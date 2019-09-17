const {
  initialBoard,
  getBlockRange
} = require('./utilities')

const validate  = require('./validate')

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function solve(board) {
  const sus = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }
  const cors = []

  for (let su = 1; su <= 9; su += 1) {
    for (let i = 0; i < 9; i += 1) {
      const range = getBlockRange(i + 1)

      let r = random(range.r[0], range.r[1])
      let c = random(range.c[0], range.c[1])
      let t = 1

      Object.keys(sus).forEach(su => {
        sus[su].forEach(cor => {
          cors.push(cor)
        })
      })

      for (t ; t <= 30; t += 1) {
        if (
          cors.map(cor => cor.toString()).includes([r, c].toString())
          || sus[su].map(cor => cor[0]).includes(r)
          || sus[su].map(cor => cor[1]).includes(c)
        ) {
          r = random(range.r[0], range.r[1])
          c = random(range.c[0], range.c[1])
        } else {
          break
        }
      }

      sus[su][i] = [r, c]
    }
  }
  // render the sus into the board
  Object.keys(sus).map(su => {
    sus[su].forEach(cor => {
      let r = cor[0]
      let c = cor[1]
      board[r][c] = Number(su)
    })
  })
  return board 
}

let testBoard = solve(initialBoard)

while (!validate(testBoard)) {
  console.log(testBoard)
  testBoard = solve(initialBoard)
}

console.log(testBoard)
console.log(validate(testBoard))
