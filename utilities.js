const SCALE = 9
const initialBoard = new Array(SCALE)
  .fill()
  .map(row => new Array(SCALE).fill(0))

const validBoardA = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [3, 1, 2, 8, 4, 5, 9, 6, 7],
  [6, 9, 7, 3, 1, 2, 8, 4, 5],
  [8, 4, 5, 6, 9, 7, 3, 1, 2],
  [2, 3, 1, 5, 7, 4, 6, 9, 8],
  [9, 6, 8, 2, 3, 1, 5, 7, 4],
  [5, 7, 4, 9, 6, 8, 2, 3, 1],
]

function getBlockRange(i) {
  let r = i%3 || 3
  let c = Math.ceil(i/3)

  const baseR = (c - 1) * 3
  const baseC = (r - 1) * 3

  return {
    r: [baseR, baseR + 1, baseR + 2],
    c: [baseC, baseC + 1, baseC + 2],
  }
}

module.exports = {
  initialBoard,
  validBoardA,
  getBlockRange, 
}
