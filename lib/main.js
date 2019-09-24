"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Sudoku solver & generator
 * @author Vincent77
 * @email wentianqi77@outlook.com
 */
var _require = require('./utilities'),
    blockCors = _require.blockCors,
    blockIndexMap = _require.blockIndexMap;

function solve() {
  var inputBoard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [[], [], [], [], [], [], [], [], []];
  // copy the origin board
  var board = inputBoard.map(function (row) {
    return row.map(function (n) {
      return n;
    });
  });

  var pick = function pick() {
    var seed = 1 + Math.floor(Math.random() * arguments.length);
    return seed - 1 < 0 || arguments.length <= seed - 1 ? undefined : arguments[seed - 1];
  };

  var range = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // If it did not end over this amount of tests, end the solver

  var threshold = 10000;
  var tried = 0;
  var test = 0;

  var _loop = function _loop(_y) {
    var _loop3 = function _loop3(_x) {
      var su = board[_y][_x];

      if (su) {
        x = _x;
        return "continue";
      }

      if (test > threshold) {
        y = _y;
        x = _x;
        return {
          v: {
            v: false
          }
        };
      }

      var picked = blockCors[blockIndexMap[_y][_x]].map(function (cor) {
        return board[cor[1]][cor[0]];
      });

      var availables = range.filter(function (n) {
        return (// Filter out row existing
          !board[_y].includes(n) // Filter out column existing
          && !board.map(function (row) {
            return row[_x];
          }).includes(n) // Filter out block existing
          && !picked.includes(n)
        );
      });

      if (availables.length === 0) {
        tried++;

        if (tried >= _y * 9 + _x) {
          for (var i = 0; i < _y; i++) {
            board[i] = inputBoard[i].map(function (n) {
              return n;
            });
          }

          tried = 0;
          _y = -1;
          test++;
          x = _x;
          return "break";
        }

        _x = _x - tried;

        if (_x >= 0) {
          var _board$_y;

          board[_y].splice(_x);

          (_board$_y = board[_y]).push.apply(_board$_y, _toConsumableArray(inputBoard[_y].map(function (n) {
            return n;
          }).splice(_x)));

          _x--;
          x = _x;
          return "continue";
        } else {
          var _board$_y2;

          for (var _i = 0; _i < Math.abs(Math.ceil(_x / 9)); _i++) {
            board[_y] = inputBoard[_y].map(function (n) {
              return n;
            });
            _y--;
          }

          _x = 9 + _x % 9;

          board[_y].splice(_x);

          (_board$_y2 = board[_y]).push.apply(_board$_y2, _toConsumableArray(inputBoard[_y].map(function (n) {
            return n;
          }).splice(_x)));

          _y--;
          x = _x;
          return "break";
        }
      } else {
        board[_y][_x] = su || pick.apply(void 0, _toConsumableArray(availables));
      }

      x = _x;
    };

    _loop2: for (var x = 0; x < 9; x++) {
      var _ret2 = _loop3(x);

      switch (_ret2) {
        case "continue":
          continue;

        case "break":
          break _loop2;

        default:
          if (_typeof(_ret2) === "object") return _ret2.v;
      }
    }

    y = _y;
  };

  for (var y = 0; y < 9; y++) {
    var _ret = _loop(y);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return board;
}

module.exports = solve;