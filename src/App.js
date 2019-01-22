import React, { Component } from 'react';
import './App.css';

import Game from './components/Game.js';

const resetState = {
  gameState: 'PLAY',
  gameWin: false,
  turn: 'x',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = resetState;
  }

  changeTurn = () =>
    this.setState({ turn: this.state.turn === 'x' ? 'o' : 'x' });

  changeGameState = () =>
    this.setState({
      gameState: this.state.gameState === 'PLAY' ? 'END' : 'PLAY',
    });

  changeGameWinStatus = () =>
    this.setState({
      gameWin: !this.state.gameWin,
    });

  playAgain = () => {
    this.changeGameState();
    this.setState(resetState);
  };

  render() {
    const { gameState, gameWin, turn } = this.state;

    const playerTurn =
      turn === 'x' ? (
        <i className="fas fa-times" />
      ) : (
        <i className="fas fa-circle" />
      );

    const winner =
      turn === 'x' ? (
        <i className="fas fa-circle" />
      ) : (
        <i className="fas fa-times" />
      );

    const infosAfterBoard =
      gameState === 'PLAY' ? (
        <div className="afterBoard">
          <p>{playerTurn} turn</p>
        </div>
      ) : (
        <div className="afterBoard">
          <p>{gameWin ? winner : 'nobody'} won !</p>
        </div>
      );

    return (
      <div className="App">
        <Game
          gameState={gameState}
          changeGameState={this.changeGameState.bind(this)}
          gameWin={gameWin}
          changeGameWinStatus={this.changeGameWinStatus.bind(this)}
          turn={turn}
          changeTurn={this.changeTurn.bind(this)}
          playAgain={this.playAgain.bind(this)}
        />
        {infosAfterBoard}
      </div>
    );
  }
}

export default App;
