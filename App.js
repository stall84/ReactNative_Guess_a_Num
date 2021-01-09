
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};



export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [appReady, setAppReady] = useState(false);

  if (!appReady) {
    return <AppLoading startAsync={fetchFonts} 
            onFinish={() => setAppReady(true)}
            onError={(err) => console.log(err)}
           />
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const restartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;


  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen numberOfRounds={guessRounds} userNumber={userNumber} restartGame={restartGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess-a-Num"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
});
