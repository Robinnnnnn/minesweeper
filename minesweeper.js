const generatePlayerBoard = (numberOfRows, numberOfColumns) =>
  {const board = [ ];
  for (let rows = 0; rows < numberOfRows; rows++) {
    //creates a new row for board
    let row = [];
    for (columns = 0; columns < numberOfColumns; columns++) {
    //determines number of columns to be pushed to row array
    row.push('');
  };
    //row array is pushed to board, this is on iteration of row for loop
    board.push(row);
  };
  return board;
};
//-------------------------------------------------------------------------------//
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    const board = [ ];
    for(let rows = 0; rows < numberOfRows; rows++){
      const row = [ ];
      for(columns = 0; columns < numberOfColumns; columns++){
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    //can potentially put bombs in the same place
    while(numberOfBombsPlaced < numberOfBombs){
      const randomRowIndex = Math.floor(numberOfRows * Math.random());
      const randomColumnIndex = Math.floor(numberOfColumns * Math.random());
      if(board[randomRowIndex][randomColumnIndex] !== "B"){
        board[randomRowIndex][randomColumnIndex] = "B";
        numberOfBombsPlaced++;
      }
    }

  console.log(board);
};
//------------------------------------------------------------------------//
//row & column index is selected by player
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offsets => {
    const neighborRowIndex = rowIndex + offsets[0];
    const neighborColumnIndex = columnIndex + offsets[1];

    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex > numberOfColumns){
      if(bombBoard[neighborRowIndex][neighborColumnIndex] === "B") {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};
//------------------------------------------------------------------------//
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {

  if(playerBoard[rowIndex][columnIndex] !== " "){
    console.log('This tile has already been flipped!');
    return;
  }else if(bombBoard[rowIndex][columnIndex] === 'B'){
    playerBoard[rowIndex][columnIndex] = "B";
  }else{
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

//prints a bomb or player board in correct structure
const printBoard = board => console.log(board.map(row => row.join(" | ")).join('\n'));

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);
console.log(getNumberOfNeighborBombs(bombBoard, 0, 0));
printBoard(playerBoard);
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
// // Flip different tiles based on bombBoard to see if neighbors work.
printBoard(playerBoard);
