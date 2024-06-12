import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Board from './Board';

const Game = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  const handlePress = (row, col) => {
    if (board[row][col] !== '' || winner) return;
    const newBoard = board.map((r, rowIndex) =>
      r.map((c, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return currentPlayer;
        }
        return c;
      })
    );

    setBoard(newBoard);
    const { winner: newWinner, line } = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setWinningLine(line);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
        return { winner: board[i][0], line: { x1: 10, y1: 50 + 100 * i, x2: 290, y2: 50 + 100 * i } };
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
        return { winner: board[0][i], line: { x1: 50 + 100 * i, y1: 10, x2: 50 + 100 * i, y2: 290 } };
      }
    }
    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
      return { winner: board[0][0], line: { x1: 10, y1: 10, x2: 290, y2: 290 } };
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
      return { winner: board[0][2], line: { x1: 290, y1: 10, x2: 10, y2: 290 } };
    }
    // Check draw
    if (board.every(row => row.every(cell => cell !== ''))) {
      return { winner: 'Draw', line: null };
    }
    return { winner: null, line: null };
  };

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <View style={styles.container}>
      <Board board={board} onPress={handlePress} winningLine={winningLine} />
      {winner && <Text style={styles.winnerText}>{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}</Text>}
      <Button title="Reset Game" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  winnerText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Game;
