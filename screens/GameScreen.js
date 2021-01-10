import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DefaultStyles from '../constants/default-styles';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {

    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min) + min);
    if (randNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNum;
    }
};

    const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>Round: {numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
    );

const GameScreen = props => {

    const { userChoice, onGameOver } = props;           // destructure out user's original choice and onGameOver funcion from App.js
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1); 
    const currentHigh = useRef(100);   

    

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
     
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'higher' && currentGuess > userChoice)) {
            Alert.alert('Don\'t Cheat!!', 'Play fair', [{text: 'Sorry!', style: 'cancel'}
        ]);
        return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currRounds => currRounds + 1)
        setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses])
    };
    
    const remindHandler = () => {
        Alert.alert('You Picked:', `${userChoice}`, [{text: 'Thanks!', style: 'cancel'}])
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>               
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
                <Button title="Remind Me" onPress={remindHandler} />
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>     
        </View>
    );
};


const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 320,
        maxWidth: '80%',
    },
    list: {
        flex: 1,
        width: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-around',
    },
    
});

export default GameScreen;