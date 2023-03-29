'use strict';
var gLevel = 4;
var gBoard;

var gLevel = {
  SIZE: 4,
  MINES: 2,
};

function onInIt() {
  gBoard = buildBoard();
  gBoard[1][2].isMine = true;
  gBoard[1][1].isMine = true;
  setMinesNegsCount(gBoard);
  renderBoard(gBoard, '.board');
}

function buildBoard() {
  const board = [];
  for (var i = 0; i < 4; i++) {
    board.push([]);
    for (var j = 0; j < 4; j++) {
      board[i][j] = {
        minesAroundCount: 4,
        isShown: false,
        isMine: false,
        isMarked: true,
      };
    }
  }
  return board;
}

function renderBoard(mat, selector) {
  var strHTML = '<table><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j];
      const className = `cell cell-${i}-${j}`;
      strHTML += `<td onclick="onCellClicked(this,${i},${j})" class="${className}">`;
      strHTML += cell.minesAroundCount;
      if (cell.isMine) strHTML += 'MINE';
    }
    strHTML += '</td></tr>';
  }
  strHTML += '</tbody></table>';
  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function setMinesNegsCount(BOARD) {
  for (var i = 0; i < BOARD.length; i++) {
    for (var j = 0; j < BOARD[i].length; j++) {
      var currCell = BOARD[i][j];
      if (!currCell.isMine) {
        var cellMineCount = countNeighborsAround(i, j);
        currCell.minesAroundCount = cellMineCount;
      }
    }
  }
}

function countNeighborsAround(rowIdx, colIdx) {
  var NeighborsAround = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= gBoard[0].length) continue;
      var currCell = gBoard[i][j];
      if (currCell.isMine) NeighborsAround++;
    }
  }
  return NeighborsAround;
}

function onCellClicked(elCell, i, j) {
  console.log(elCell, i, j);
}
