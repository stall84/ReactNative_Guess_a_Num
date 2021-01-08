import React, { useState } from 'react';
import { StyleSheet,
         Text, 
         View, 
         Button, 
         TouchableWithoutFeedback, 
         Keyboard, 
         Alert } from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import Input from '../components/Input';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 
                        'Number has to be a number between 1 and 99', 
                        [{text: 'Okay', style: 'destructive', 
                        onPress: resetInputHandler }]
            );
            return;
        };
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.confirmContainer}>
            <Text>You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title="START GAME!"/>
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>START A NEW GAME!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                        <Input style={styles.input} 
                            blurOnSubmit autoCapitalize="none" 
                            autoCorrect={false} 
                            keyboardType="number-pad" 
                            maxLength={2}
                            value={enteredValue}
                            onChangeText={numberInputHandler} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" color={Colors.accent} onPress={resetInputHandler} /></View>
                        <View style={styles.button}><Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                
                    {confirmedOutput}
                
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    confirmContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 20,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 100,
    }
});

export default StartGameScreen;