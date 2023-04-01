'use strict';

var gBoard;
var gGame;
var gActionLocationStack;
var gMineLocations;

const MINE = '💣';
const FLAG = '🚩';
const LIVE = '🧡';

var gLevel = {
  SIZE: 4,
  MINES: 2,
};

function onInIt() {
  resetAllVars();
  resetTimer();
  resetMsg();
  gBoard = buildBoard();
  renderBoard(gBoard, '.board');
  renderLives();
}

function startGame() {
  gGame.isOn = true;
  startTimer();
  addRandMines(gLevel.MINES);
  setMinesNegsCount(gBoard);
  revealCells(gActionLocationStack[gActionLocationStack.length - 1]);
}

function endGame(isWinner) {
  gGame.isOn = false;
  gGame.isOver = true;
  stopTimer();
  var elmsg = document.querySelector('.msg');
  var elSmiley = document.querySelector('.smiley');

  if (isWinner) {
    elmsg.innerHTML = 'You Are a Winner!';
    elSmiley.innerHTML = '😎';
  } else {
    elmsg.innerHTML = 'GAME OVER!';
    elSmiley.innerHTML = '🤯';
  }
}

function resetAllVars() {
  gGame = {
    isOn: false,
    isOver: false,
    shownCount: 0,
    lives: 3,
    markedCount: 0,
    secsPassed: 0,
  };
  gMineLocations = [];
  gActionLocationStack = [];
}

function resetMsg() {
  var elMsg = document.querySelector('.msg');
  var elSmiley = document.querySelector('.smiley');
  elSmiley.innerHTML = '😁';
  elMsg.innerHTML = '';
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    var row = [];
    for (var j = 0; j < gLevel.SIZE; j++) {
      var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
      row.push(cell);
    }
    board.push(row);
  }
  return board;
}

function renderBoard(board, selector) {
  var strHTML = '<table ><tbody>';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[i].length; j++) {
      var className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="markCell(event, ${i}, ${j})"></td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function addRandMines(numOfMines) {
  var randEmprtCellLocations = shuffle(getEmptyCellLocations(gBoard));
  for (var i = 0; i < numOfMines; i++) {
    var currLocation = randEmprtCellLocations.pop();
    gMineLocations.push(currLocation);
    gBoard[currLocation.i][currLocation.j].isMine = true;
  }
}

function getEmptyCellLocations(board) {
  var emptyCellLocations = [];
  var firstRevealLocation =
    gActionLocationStack[gActionLocationStack.length - 1];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var range = Math.sqrt(
        (firstRevealLocation.i - i) ** 2 + (firstRevealLocation.j - j) ** 2
      );
      if (range > Math.SQRT2) emptyCellLocations.push({ i, j });
    }
  }
  return emptyCellLocations;
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var currCell = board[i][j];
      if (currCell.isMine) continue;
      currCell.minesAroundCount = countMinesAround({ i, j }, board);
    }
  }
}

function onCellClicked(elCell, i, j) {
  var cell = gBoard[i][j];
  if (cell.isMarked || cell.isShown || gGame.isOver) return;
  gActionLocationStack.push({ i, j, isRightClick: false });
  if (gGame.isOn === false) return startGame();
  // if (
  //   gGame.markedCount === gLevel.MINES &&
  //   gLevel.SIZE ** 2 - gLevel.MINES === gGame.shownCount + gLevel.MINES - 2
  // ) {
  //   endGame(true);
  // }
  checkIfGameOver();
  if (cell.isMine) {
    gGame.lives--;
    renderLives();
    var elSmiley = document.querySelector('.smiley');
    elSmiley.innerHTML = '🥲';
    setTimeout(() => {
      elSmiley.innerHTML = '😁';
    }, '1500');
    alert('You got Bombed 🧨');
    if (gGame.lives === 0) {
      revealMines();
      endGame(false);
    }
  }
  revealCells({ i, j });
}

function revealMines() {
  for (var location of gMineLocations) {
    gBoard[location.i][location.j].isShown = true;
    renderCell(location);
  }
}

function revealCells(location) {
  var currCell = gBoard[location.i][location.j];
  if (currCell.isShown || currCell.isMarked) return;
  currCell.isShown = true;
  renderCell(location);
  gGame.shownCount++;

  checkIfGameOver();

  ExpandShown(location);
}

function ExpandShown(location) {
  var currCell = gBoard[location.i][location.j];
  if (currCell.minesAroundCount === 0 && !currCell.isMine) {
    for (var i = location.i - 1; i <= location.i + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue;
      for (var j = location.j - 1; j <= location.j + 1; j++) {
        if (j < 0 || j >= gBoard[i].length) continue;
        if (i === location.i && j === location.j) continue;
        revealCells({ i, j });
      }
    }
  }
}

function checkIfGameOver() {
  var livesLost = 3;
  livesLost - gGame.lives;
  var totalSafecells = gLevel.SIZE ** 2 - gLevel.MINES + livesLost;
  if (
    gGame.markedCount === gLevel.MINES &&
    gLevel.SIZE ** 2 - gLevel.MINES === gGame.shownCount + gLevel.MINES - 2
  ) {
    endGame(true);
  }
  if (
    gGame.shownCount === totalSafecells &&
    gGame.markedCount + livesLost === gLevel.MINES
  )
    endGame(true);
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var cell = gBoard[location.i][location.j];
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
  var elCellContent;

  if (!cell.isShown) {
    elCell.classList.remove('shown');
    if (cell.isMarked) elCellContent = FLAG;
    else elCellContent = '';
  } else {
    elCell.classList.add('shown');
    if (cell.isMine) elCellContent = MINE;
    else if (cell.minesAroundCount === 0) elCellContent = cell.minesAroundCount;
    else elCellContent = cell.minesAroundCount;
  }
  elCell.innerHTML = elCellContent;
}

function onChangeLevel(level, minesCount) {
  gLevel.SIZE = level;
  gLevel.MINES = minesCount;

  onInIt();
}

function countMinesAround(location, board) {
  var minesAroundCount = 0;
  for (var i = location.i - 1; i <= location.i + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = location.j - 1; j <= location.j + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === location.i && j === location.j) continue;
      if (board[i][j].isMine) minesAroundCount++;
    }
  }

  return minesAroundCount;
}

function markCell(ev, i, j) {
  ev.preventDefault();
  var cell = gBoard[i][j];

  if (cell.isShown || gGame.isOver) return;

  gActionLocationStack.push({ i, j, isRightClick: true });
  startTimer();

  if (!cell.isMarked) {
    cell.isMarked = true;
    gGame.markedCount++;
  } else {
    cell.isMarked = false;
    gGame.markedCount--;
  }
  renderCell({ i, j });
  checkIfGameOver();
}
function onRestartGame() {
  onInIt();
}

function renderLives() {
  var elLives = document.querySelector('.lives');
  var livesStr = LIVE.repeat(gGame.lives);
  elLives.innerHTML = livesStr;
}
function darkMode() {
  var element = document.body;
  element.classList.toggle('dark-mode');
}
