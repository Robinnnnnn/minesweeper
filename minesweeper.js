const generatePlayerBoard = (numberOfRows, numberOfColumns) =>
  {let board = [ ];
  for(rows = 0; rows <= numberOfRows; rows++){
    //creates a new row for board
    let row = [ ];
    for(columns = 0; columns <= numberOfColumns; columns++){
    //determines number of columns to be pushed to row array
    row.push(' ');
  };
    //row array is pushed to board, this is on iteration of row for loop
    board.push(row);
  };
  console.log(board);
};
//-------------------------------------------------------------------------------//
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>
{
    let board = [ ];
    for(rows = 0; rows <= numberOfRows; rows++){
      let row = [ ];
      for(columns = 0; columns <= numberOfColumns; columns++){

      row.push(null);
      };

      board.push(row);
    };


    let numberOfBombsPlaced = 0;
    //can potentially put bombs in the same place
    while(numberOfBombsPlaced <= numberOfBombs){

      let randomRowIndex = Math.round(numberOfRows * Math.random());
      let randomColumnIndex = Math.round(numberOfColumns * Math.random());
      board[randomRowIndex][randomColumnIndex] = "B";
      numberOfBombsPlaced ++;


    };

  return board;
};
const printBoard = board => console.log(board.map(row => row.join(" | ")).join('/n'));



let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:')
printBoard(bombBoard);
