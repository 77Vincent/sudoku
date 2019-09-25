import '../styles/index.scss'
import { solve, blockCors, blockIndexMap } from '../sudoku-core'
import $ from 'jquery'

const boardData = solve()
const boardInBlockFormat = [ [], [], [], [], [], [], [], [], [] ]

const board = $('.board')

boardData.forEach((row, y) => {
  row.forEach((n, x) => {
    const whichBlock = blockIndexMap[y][x]
    boardInBlockFormat[whichBlock].push(n)
  })
})

boardInBlockFormat.forEach(row => {
  const blockElement = $('<div />')
    .addClass('board-block')
    .appendTo(board)
  row.forEach(n => {
    $('<div />')
      .text(n)
      .addClass('board-cell')
      .appendTo(blockElement)
  })
})
