const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
var visited = [];
var animations = [];

function move(cell, array) {
  if (cell[0] < 0 || cell[0] >= 15 || cell[1] < 0 || cell[1] >= 20)
    return false;
  else {
    if (array[cell[0]][cell[1]] === 0) return false;
    array[cell[0]][cell[1]] = 2;
    return true;
  }
}

export function robotclean(arr) {
  var ar = [];

  for (var i = 0; i < 15; i++) {
    var c = [];
    for (var j = 0; j < 20; j++) {
      if (arr[20 * i + j] === 0) c.push(0);
      else c.push(1);
    }
    ar.push(c);
  }
  var direction = 0; //  0: 'up', 1: 'right', 2: 'down', 3: 'left'
  var cell = [0, 0];
  backtrack(ar, cell, direction);
  //console.log(visited);
  let finish = [];
  finish.push(animations);
  finish.push(visited);
  return finish;
}

function apush(arr) {
  var c = [];
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 20; j++) {
      c.push(arr[i][j]);
    }
  }
  animations.push(c);
}

function has(array, item) {
  for (var i = 0; i < array.length; i++) {
    // This if statement depends on the format of your array
    if (array[i][0] === item[0] && array[i][1] === item[1]) {
      return true; // Found it
    }
  }
  return false; // Not found
}

function backtrack(array, cell, direction) {
  //console.log(visited);

  apush(array, cell);
  visited.push(cell);
  array[cell[0]][cell[1]] = 2;

  for (var i = 0; i < 4; i++) {
    var new_cell = [];
    var new_d = (direction + i) % 4;
    new_cell.push(cell[0] + directions[new_d][0]);
    new_cell.push(cell[1] + directions[new_d][1]);
    //console.log(has(visited, new_cell));
    if (has(visited, new_cell) === false && move(new_cell, array) === true) {
      backtrack(array, new_cell, new_d);
    }
  }
}
