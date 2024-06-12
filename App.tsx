// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Game from './src/Component/Game';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Game />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
