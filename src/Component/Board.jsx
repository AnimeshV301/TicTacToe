import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Line } from 'react-native-svg';

const Board = ({ board, onPress, winningLine }) => {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity 
              key={colIndex} 
              style={styles.cell} 
              onPress={() => onPress(rowIndex, colIndex)}
            >
              <Text style={styles.cellText}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {winningLine && (
        <Svg height="300" width="300" style={styles.svg}>
          <Line
            x1={winningLine.x1}
            y1={winningLine.y1}
            x2={winningLine.x2}
            y2={winningLine.y2}
            stroke="black"
            strokeWidth="5"
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    marginBottom: 20,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 32,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Board;
