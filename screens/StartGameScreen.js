import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const StartGameScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>START A NEW GAME!</Text>
            <View style={styles.inputContainer}>
                <Text>Select a Number</Text>
                    <TextInput />
                <View style={styles.buttonContainer}>
                    <Button title="Reset" color="green" onPress={() => {}} />
                    <Button title="Confirm" color="red" onPress={() => {}} />
                </View>
            </View>
        </View>
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
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default StartGameScreen;