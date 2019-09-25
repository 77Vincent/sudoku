import '../styles/index.scss'
import {
  solve,
  blockCors,
  blockIndexMap,
  generate,
} from '../sudoku-core'
import $ from 'jquery'

const boardData = solve()
const boardElement = $('.board')

function boardBlockFormatConvertor(board) {
  const output = [ [], [], [], [], [], [], [], [], [] ]
  board.forEach((row, y) => {
    row.forEach((n, x) => {
      const whichBlock = blockIndexMap[y][x]
      output[whichBlock].push(n)
    })
  })
  return output
}

boardBlockFormatConvertor(generate(boardData, 5)).forEach(row => {
  const blockElement = $('<div />')
    .addClass('board-block')
    .appendTo(boardElement)
  row.forEach(n => {
    $('<div />')
      .text(n || '')
      .addClass(`board-cell ${n !== 0 ? 'board-cell-existing' : ''}`)
      .appendTo(blockElement)
  })
})
