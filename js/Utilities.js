'use strict';

function createMat(ROWS, COLS = ROWS) {
  var mat = [];
  for (var i = 0; i < ROWS; i++) {
    var row = [];
    for (var j = 0; j < COLS; j++) {
      row.push('');
    }
    mat.push(row);
  }
  return mat;
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell-' + i + '-' + j;
      strHTML += '<td class="' + className + '">' + cell + '</td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// returns a location object: { i, j }
function getRndEmptyCellLocation(
  mat,
  emptyCellDefinition,
  ifNoEmptyCells = null
) {
  var emptyCells = [];
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === emptyCellDefinition) {
        emptyCells.push({ i, j });
      }
    }
  }

  if (emptyCells.length > 0) {
    var rndIdx = getRandomIntExclusive(0, emptyCells.length);
    return emptyCells[rndIdx];
  }

  return ifNoEmptyCells;
}

function countNeighbors(location, mat, whatToCount) {
  var neighborsCount = 0;
  for (var i = location.i - 1; i <= location.i + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = location.j - 1; j <= location.j + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === location.i && j === location.j) continue;
      // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++;
      if (mat[i][j] === whatToCount) neighborsCount++;
    }
  }
  return neighborsCount;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

function getTime() {
  return new Date().toString().split(' ')[4];
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntExclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function formatSecToTime(secStr) {
  var sec = parseInt(secStr);
  min = Math.floor(sec / 60);
  sec = sec % 60;

  if (sec < 10 || sec == 0) {
    sec = '0' + sec;
  }
  if (min < 10 || min == 0) {
    min = '0' + min;
  }

  var timeStr = min + ':' + sec;
  return timeStr;
}
