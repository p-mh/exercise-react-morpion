import React, { Component } from 'react';

import './game.css';

import Cell from './Cell.js';

const winPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetState = {
  winRestPossibilities: [],
  cells: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  },
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = resetState;
  }

  playChangeValue = index => {
    const { cells } = this.state;
    const { turn, gameState, changeTurn } = this.props;
    if (gameState === 'PLAY' && !cells[index]) {
      this.setState(
        {
          cells: { ...cells, [index]: turn },
        },
        () => {
          this.checkWinner(index);
          changeTurn();
        }
      );
    }
  };

  checkWinner = index => {
    const { turn, changeGameState, changeGameWinStatus } = this.props;

    const findPossibility = winPossibilities
      .filter(solutionToCheck => solutionToCheck.includes(index))
      .find(solutionToCheck =>
        solutionToCheck.every(
          solutionIndex => this.state.cells[solutionIndex] === turn
        )
      );

    if (findPossibility) {
      this.setState({
        winRestPossibilities: findPossibility,
      });
      changeGameState();
      changeGameWinStatus();
    } else if (!Object.values(this.state.cells).includes(null)) {
      changeGameState();
    }
  };

  playAgain = () => {
    this.props.playAgain();
    this.setState(resetState);
  };

  render() {
    const { winRestPossibilities, cells } = this.state;
    const cellsMapped = Object.values(cells).map((value, index) => (
      <Cell
        key={index}
        value={value}
        onClick={this.playChangeValue.bind(this, index)}
        win={winRestPossibilities.includes(index) ? true : false}
      />
    ));

    const buttonPlayAgain =
      this.props.gameState === 'END' ? (
        <button onClick={this.playAgain}>REJOUER</button>
      ) : null;

    return (
      <div>
        <div className="game">{cellsMapped}</div>
        {buttonPlayAgain}
      </div>
    );
  }
}
