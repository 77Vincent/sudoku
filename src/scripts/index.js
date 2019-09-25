import '../styles/index.scss'
import {
  solve,
  blockCors,
  blockIndexMap,
  generate,
} from '../sudoku-core'
import $ from 'jquery'

const boardData = solve()

const board = $('.board')

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

boardBlockFormatConvertor(generate(boardData, 3)).forEach(row => {
  const blockElement = $('<div />')
    .addClass('board-block')
    .appendTo(board)
  row.forEach(n => {
    $('<div />')
      .text(n || '')
      .addClass('board-cell')
      .appendTo(blockElement)
  })
})
