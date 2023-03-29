'use strict';

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
//                  For games

function createMat(ROWS, COLS) {
  const mat = [];
  for (var i = 0; i < ROWS; i++) {
    const row = [];
    for (var j = 0; j < COLS; j++) {
      row.push('');
    }
    mat.push(row);
  }
  return mat;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderCell(location, value) {
  const cellSelector = '.' + getClassName(location);
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}
function renderCell(i, j, value) {
  const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
  elCell.innerText = value;
  return elCell;
}
function countNeighbors(mat, cellI, cellJ) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;
      if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
    }
  }
  return neighborsCount;
}
function drawNum() {
  var randIdx = getRandomInt(0, gNums2.length);
  var num = gNums2[randIdx];
  gNums2.splice(randIdx, 1);
  return num;
}
function drawNum(NUMS) {
  return NUMS.splice(getRandomInt(0, NUMS.length), 1)[0];
}

function getEmptyPos() {
  const emptyPoss = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].type !== WALL && !gBoard[i][j].gameElement) {
        emptyPoss.push({ i, j });
      }
    }
  }
}
function renderBoard(mat, selector) {
  var strHTML = '<table><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';

  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

// function gameOver() {
//   gIsGameOn = false;
//   clearInterval(gBallInterval);
//   clearInterval(gGlueInterval);
//   showModal();
// }
// function onHandleKey(event) {
//   const i = gGamerPos.i;
//   const j = gGamerPos.j;

//   switch (event.key) {
//     case 'ArrowLeft':
//       onMoveTo(i, j - 1);
//       break;
//     case 'ArrowRight':
//       onMoveTo(i, j + 1);
//       break;
//     case 'ArrowUp':
//       onMoveTo(i - 1, j);
//       break;
//     case 'ArrowDown':
//       onMoveTo(i + 1, j);
//       break;
//   }
// }

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
//                For Matrix

function createBoard(size) {
  var board = [];
  var num = 1;

  for (var i = 0; i < size; i++) {
    board[i] = [];
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        // value: num++,
        // isHit: false,
      };
    }
  }
  return board;
}

function checkIfSymmetric(mat) {
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat.length; j++) {
      if (mat[i][j] !== mat[j][i]) return false;
    }
  }
  return true;
}
function findAvg(mat) {
  var sum = 0;
  var count = 0;
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[i].length; j++) {
      sum += mat[i][j];
      count++;
    }
  }
  const avg = sum / count;
  return avg;
}
function findMax(mat, colIdx) {
  var max = -Infinity;

  for (var i = 0; i < mat.length; i++) {
    var currCol = mat[i][colIdx];
    if (max < currCol) {
      max = currCol;
    }
  }
  return max;
}

function sumRow(mat, rowIdx) {
  var sum = 0;
  for (var i = 0; i < mat.length; i++) {
    sum += mat[rowIdx][i];
  }
  return sum;
}
function sumCol(mat, colIdx) {
  var sum = 0;
  for (var i = 0; i < mat.length; i++) {
    sum += mat[i][colIdx];
  }
  return sum;
}
function sumMainDiagonomal(mat) {
  var mainSum = 0;
  for (let i = 0; i < mat.length; i++) {
    mainSum += mat[i][i];
  }
  return mainSum;
}
function sumSecondaryDiagonomal(mat) {
  var secondarySum = 0;
  for (let i = 0; i < mat.length; i++) {
    secondarySum += mat[i][mat.length - i - 1];
  }
  return secondarySum;
}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
//                   Array's

function forEach(students, func) {
  for (var i = 0; i < students.length; i++) {
    console.log('i:', i);
    func(students[i]);
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

function countWordApperances(str) {
  var words = str.split(' ');
  var wordsCountMap = {};
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (word in wordsCountMap) {
      wordsCountMap[word]++;
    } else {
      wordsCountMap[word] = 1;
    }
  }
  return wordsCountMap;
}
console.log(getNthLargest([7, 56, 88, 92, 99, 89, 11], 3));

function getNthLargest(nums, nthNum) {
  var sortedNums = nums.sort((a, b) => b - a);
  console.log(sortedNums);

  return sortedNums[nthNum - 1];
}
function mySplit(str, sep) {
  var result = [];
  var start = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === sep) {
      result.push(str.substring(start, i));
      start = i + 1;
    }
  }
  result.push(str.substring(start));
  return result;
}
function removeDuplicates(nums) {
  // sampleArr set to 5 digits
  var sampleArr = [0, 0, 0, 0, 0, 0];
  var uniqueNums = [];

  for (var i = 0; i < nums.length; i++) {
    if (sampleArr[nums[i]] === 0) {
      uniqueNums.push(nums[i]);
    }
    sampleArr[nums[i]]++;
  }
  return uniqueNums;
}
// Get array with stop conidion
function getArrayFromUser() {
  var array = [];
  var input = 0;

  while (input !== 999) {
    input = +prompt('Give a number please (enter 999 to stop)');
    array.push(input);
  }

  return array;
}
