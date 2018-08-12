const { uniq } = require('lodash');

const spots = {
  0: { val: null, constant: false, placed: false, row: 0, col: 0, sqr: 0, checks: [] },
  1: { val: null, constant: false, placed: false, row: 0, col: 1, sqr: 0, checks: []  },
  2: { val: null, constant: false, placed: false, row: 0, col: 2, sqr: 0, checks: []  },
  3: { val: null, constant: false, placed: false, row: 0, col: 3, sqr: 1, checks: []  },
  4: { val: null, constant: false, placed: false, row: 0, col: 4, sqr: 1, checks: []  },
  5: { val: null, constant: false, placed: false, row: 0, col: 5, sqr: 1, checks: []  },
  6: { val: null, constant: false, placed: false, row: 0, col: 6, sqr: 2, checks: []  },
  7: { val: null, constant: false, placed: false, row: 0, col: 7, sqr: 2, checks: []  },
  8: { val: null, constant: false, placed: false, row: 0, col: 8, sqr: 2, checks: []  },
  9: { val: null, constant: false, placed: false, row: 1, col: 0, sqr: 0, checks: []  },
  10: { val: null, constant: false, placed: false, row: 1, col: 1, sqr: 0, checks: []  },
  11: { val: null, constant: false, placed: false, row: 1, col: 2, sqr: 0, checks: []  },
  12: { val: null, constant: false, placed: false, row: 1, col: 3, sqr: 1, checks: []  },
  13: { val: null, constant: false, placed: false, row: 1, col: 4, sqr: 1, checks: []  },
  14: { val: null, constant: false, placed: false, row: 1, col: 5, sqr: 1, checks: []  },
  15: { val: null, constant: false, placed: false, row: 1, col: 6, sqr: 2, checks: []  },
  16: { val: null, constant: false, placed: false, row: 1, col: 7, sqr: 2, checks: []  },
  17: { val: null, constant: false, placed: false, row: 1, col: 8, sqr: 2, checks: []  },
  18: { val: null, constant: false, placed: false, row: 2, col: 0, sqr: 0, checks: []  },
  19: { val: null, constant: false, placed: false, row: 2, col: 1, sqr: 0, checks: []  },
  20: { val: null, constant: false, placed: false, row: 2, col: 2, sqr: 0 , checks: [] },
  21: { val: null, constant: false, placed: false, row: 2, col: 3, sqr: 1, checks: []  },
  22: { val: null, constant: false, placed: false, row: 2, col: 4, sqr: 1, checks: []  },
  23: { val: null, constant: false, placed: false, row: 2, col: 5, sqr: 1, checks: []  },
  24: { val: null, constant: false, placed: false, row: 2, col: 6, sqr: 2, checks: []  },
  25: { val: null, constant: false, placed: false, row: 2, col: 7, sqr: 2, checks: []  },
  26: { val: null, constant: false, placed: false, row: 2, col: 8, sqr: 2 , checks: [] },
  27: { val: null, constant: false, placed: false, row: 3, col: 0, sqr: 3, checks: []  },
  28: { val: null, constant: false, placed: false, row: 3, col: 1, sqr: 3, checks: []  },
  29: { val: null, constant: false, placed: false, row: 3, col: 2, sqr: 3, checks: []  },
  30: { val: null, constant: false, placed: false, row: 3, col: 3, sqr: 4, checks: []  },
  31: { val: null, constant: false, placed: false, row: 3, col: 4, sqr: 4, checks: []  },
  32: { val: null, constant: false, placed: false, row: 3, col: 5, sqr: 4 , checks: [] },
  33: { val: null, constant: false, placed: false, row: 3, col: 6, sqr: 5, checks: []  },
  34: { val: null, constant: false, placed: false, row: 3, col: 7, sqr: 5, checks: []  },
  35: { val: null, constant: false, placed: false, row: 3, col: 8, sqr: 5, checks: []  },
  36: { val: null, constant: false, placed: false, row: 4, col: 0, sqr: 3, checks: []  },
  37: { val: null, constant: false, placed: false, row: 4, col: 1, sqr: 3, checks: []  },
  38: { val: null, constant: false, placed: false, row: 4, col: 2, sqr: 3, checks: []  },
  39: { val: null, constant: false, placed: false, row: 4, col: 3, sqr: 4, checks: []  },
  40: { val: null, constant: false, placed: false, row: 4, col: 4, sqr: 4, checks: []  },
  41: { val: null, constant: false, placed: false, row: 4, col: 5, sqr: 4, checks: []  },
  42: { val: null, constant: false, placed: false, row: 4, col: 6, sqr: 5, checks: []  },
  43: { val: null, constant: false, placed: false, row: 4, col: 7, sqr: 5, checks: []  },
  44: { val: null, constant: false, placed: false, row: 4, col: 8, sqr: 5, checks: []  },
  45: { val: null, constant: false, placed: false, row: 5, col: 0, sqr: 3, checks: []  },
  46: { val: null, constant: false, placed: false, row: 5, col: 1, sqr: 3, checks: []  },
  47: { val: null, constant: false, placed: false, row: 5, col: 2, sqr: 3, checks: []  },
  48: { val: null, constant: false, placed: false, row: 5, col: 3, sqr: 4, checks: []  },
  49: { val: null, constant: false, placed: false, row: 5, col: 4, sqr: 4, checks: []  },
  50: { val: null, constant: false, placed: false, row: 5, col: 5, sqr: 4, checks: []  },
  51: { val: null, constant: false, placed: false, row: 5, col: 6, sqr: 5, checks: []  },
  52: { val: null, constant: false, placed: false, row: 5, col: 7, sqr: 5, checks: []  },
  53: { val: null, constant: false, placed: false, row: 5, col: 8, sqr: 5, checks: []  },
  54: { val: null, constant: false, placed: false, row: 6, col: 0, sqr: 6 , checks: [] },
  55: { val: null, constant: false, placed: false, row: 6, col: 1, sqr: 6, checks: []  },
  56: { val: null, constant: false, placed: false, row: 6, col: 2, sqr: 6 , checks: [] },
  57: { val: null, constant: false, placed: false, row: 6, col: 3, sqr: 7 , checks: [] },
  58: { val: null, constant: false, placed: false, row: 6, col: 4, sqr: 7 , checks: [] },
  59: { val: null, constant: false, placed: false, row: 6, col: 5, sqr: 7 , checks: [] },
  60: { val: null, constant: false, placed: false, row: 6, col: 6, sqr: 8 , checks: [] },
  61: { val: null, constant: false, placed: false, row: 6, col: 7, sqr: 8 , checks: [] },
  62: { val: null, constant: false, placed: false, row: 6, col: 8, sqr: 8 , checks: [] },
  63: { val: null, constant: false, placed: false, row: 7, col: 0, sqr: 6, checks: []  },
  64: { val: null, constant: false, placed: false, row: 7, col: 1, sqr: 6 , checks: [] },
  65: { val: null, constant: false, placed: false, row: 7, col: 2, sqr: 6 , checks: [] },
  66: { val: null, constant: false, placed: false, row: 7, col: 3, sqr: 7 , checks: [] },
  67: { val: null, constant: false, placed: false, row: 7, col: 4, sqr: 7, checks: []  },
  68: { val: null, constant: false, placed: false, row: 7, col: 5, sqr: 7 , checks: [] },
  69: { val: null, constant: false, placed: false, row: 7, col: 6, sqr: 8, checks: []  },
  70: { val: null, constant: false, placed: false, row: 7, col: 7, sqr: 8 , checks: [] },
  71: { val: null, constant: false, placed: false, row: 7, col: 8, sqr: 8, checks: []  },
  72: { val: null, constant: false, placed: false, row: 8, col: 0, sqr: 6, checks: []  },
  73: { val: null, constant: false, placed: false, row: 8, col: 1, sqr: 6 , checks: [] },
  74: { val: null, constant: false, placed: false, row: 8, col: 2, sqr: 6 , checks: [] },
  75: { val: null, constant: false, placed: false, row: 8, col: 3, sqr: 7, checks: []  },
  76: { val: null, constant: false, placed: false, row: 8, col: 4, sqr: 7 , checks: [] },
  77: { val: null, constant: false, placed: false, row: 8, col: 5, sqr: 7 , checks: [] },
  78: { val: null, constant: false, placed: false, row: 8, col: 6, sqr: 8 , checks: [] },
  79: { val: null, constant: false, placed: false, row: 8, col: 7, sqr: 8, checks: []  },
  80: { val: null, constant: false, placed: false, row: 8, col: 8, sqr: 8 , checks: [] },
}
const spotKeys = Object.keys(spots)
const startObj = () => ({ 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], });

const rows = spotKeys.reduce((result, spot) => {
  const key = spots[spot].row;
  result[key] = [...result[key], spot];
  return result;
}, startObj());

const cols = spotKeys.reduce((result, spot) => {
  const key = spots[spot].col;
  result[key] = [...result[key], spot];
  return result;
}, startObj());

const sqrs = spotKeys.reduce((result, spot) => {
  const key = spots[spot].sqr;
  result[key] = [...result[key], spot];
  return result;
}, startObj());

const cells = spotKeys.reduce((result, spot) => {
  const rowKey = spots[spot].row;
  const colKey = spots[spot].col;
  const sqrKey = spots[spot].sqr;

  const checks = uniq([...rows[rowKey], ...cols[colKey], ...sqrs[sqrKey]])
    .filter(x => x !== spot);
  
  result[spot] = {...spots[spot], checks, spot};
  return result;
}, {});

module.exports = (game) => {
  const board = {...cells};
  game.forEach(x => {
    board[x.spot].val = x.val;
    board[x.spot].constant = true;
  });
  const toSolve = spotKeys.filter(x => cells[x].constant === false);

  return {
    board,
    toSolve,
    spotKeys,
    position: 0,
    endPosition: toSolve.length -1,
    status: 'tryNumber',
  }
}

