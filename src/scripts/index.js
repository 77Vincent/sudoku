import '../styles/index.scss'
import { solve } from '../sudoku-core'
import $ from 'jquery'

const boardData = solve()

const board = $('.board')
boardData.reduce((a, row) => a.concat(row), []).forEach(n => {
  $('<div />')
    .text(n)
    .addClass('board-cell')
    .appendTo(board)
});
