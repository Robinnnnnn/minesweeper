/*jshint esversion: 6 */
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game is over, restart!');
      this._board.print();
    }else if (!this._board.hasSafeTiles()) {
      console.log('You have won!');
    }else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard () {
    return this._playerBoard;
  }

  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offsets => {
      const neighborRowIndex = rowIndex + offsets[0];
      const neighborColumnIndex = columnIndex + offsets[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  flipTile(rowIndex, columnIndex) {

    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    }else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      playerBoard[rowIndex][columnIndex] = 'B';
    }else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }

    this._numberOfTiles--;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  hasSafeTiles () {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    const board = [ ];
    for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
        row.push('');
      }

      board.push(row);
    }

    return board;
  }

  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [ ];
    for (let rows = 0; rows < numberOfRows; rows++) {
      const row = [ ];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(null);
      }

      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    //can potentially put bombs in the same place
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(numberOfRows * Math.random());
      const randomColumnIndex = Math.floor(numberOfColumns * Math.random());
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }
}

const g = new Game(3, 3, 3);
g.playMove(0, 0);
