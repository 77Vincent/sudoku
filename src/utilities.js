function colorize(color, output) {
  return ['\033[', color, 'm', output, '\033[0m'].join('');
}

function print(board, inputBoard) {
  if (!board) {
    board = new Array(9).fill().map(() => new Array(9).fill(0))
  }
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
      const n = board[y][x]
      process.stdout.write(colorize(x%3 === 0 ? BORDER_COLOR : REGULAR_COLOR, '|'))
      process.stdout.write(colorize(
        inputBoard && inputBoard[y][x] !== 0 ? INPUT_NUM_COLOR : 0,
        ` ${n ? n : ' '} `
      ))
    }
    process.stdout.write(colorize(BORDER_COLOR, '|\n'))
  }
  process.stdout.write(colorize(BORDER_COLOR, ROW))
}

module.exports = {
  colorize,
  print,
}