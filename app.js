const setupGame = require('./setup');
const { gameOne } = require('./games');
const game = setupGame(gameOne);

const statuses = {
  winner: 'winner',
  loser: 'loser',
  stepBack: 'stepBack',
  stepUp: 'stepUp',
  tryNumber: 'tryNumber',
};


// game {
//   board : {
//           0: { val: null, placed: false, checks: [] },
//          1: { val: null, placed: false, checks: []  },
//   toSolve // array of numbers that are cells that need to be solved,
//   spotKeys // key keys for the cells
//   position: // the cell that is being solved
//   endPosition: toSolve.length // when you get to this position the game is solved
//   status: 'tryNumber' // the current status 
// }

const drawBoard = ({spotKeys, board}) => {
  return spotKeys.reduce((result, spot) => {
    const spotVal = board[spot].val || '-'
    result = ((spot+1) % 9)
      ? `${result} ${spotVal}`
      : `${result} ${spotVal}\n`
    return result;
  },'')
}

const stepBack = (game) => {
  const { board, position, toSolve } = game;
  const cell = toSolve[position]
  // get out of value of cell is not 9
  if (board[cell].val < 9) {
    board[cell].placed = false;
    board[cell].val += 1;
    return { ...game, board };
  }
  // clear the cell, reset place, go back space
  board[cell].val = null;
  board[cell].placed = false;
  const newPosition = position - 1;
  // doing resursively because may have many steps back
  return stepBack({...game, board, position: newPosition});

}

const stepUp = (game) => {
  const { board, position, toSolve } = game;
  const cell = toSolve[position];
  // set old position
  board[cell].placed = true;
  const newPosition = position + 1;
  // setup new position
  const newCell = toSolve[newPosition];
  board[newCell].val = 1;
  board[newCell].placed = false;
  return { ...game, board, position: newPosition}
}

const tryNumber = (game) => {
  const { board, position, toSolve } = game;
  const cell = toSolve[position];
  board[cell].val = board[cell].val + 1
  return {...game, board};
}

const getLegal = (game) => {
  const { board, position, toSolve } = game;
  const cell = toSolve[position];
  const val = board[cell].val;
  
  const checks = board[cell].checks.map(x => board[x].val || 0)
  const backwards = checks.some(x => x === val);
  return !backwards
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
  legal, val, position  => status
  false, 9, 1           => loser
  false, 9, _           => stepBack
  false, _, _           => tryNumber
  true, _. endPosition  => winner
  true, _, _            => stepUp
*/
async function runGame (game){
  let run = true;
  let count = 0;
  game = tryNumber(game)
  while (run) {
    count += 1;
    let { board, position, status, endPosition, toSolve } = game;
    
    const cell = toSolve[position];
    let val = board[cell].val;
    let legal = getLegal(game);
    
    if (legal === false && val >= 9 && position === 0) {
      status = statuses.loser;
      run = false;
    } else if (val > 9 || (legal === false && val >= 9)) {
      status = statuses.stepBack;
      game = stepBack(game);
    } else if (legal === false) {
      status = statuses.tryNumber;
      game = tryNumber(game);
    } else if (legal === true && position === endPosition) {
      status = statuses.winner;
      run = false;
    } else {
      status = statuses.stepUp;
      game = stepUp(game);
    }
    console.log('status: ', status);
    console.log(drawBoard(game));
    await delay(5);
  }
  console.log("count: ", count)
  console.log(drawBoard(game));
}

runGame(game)


