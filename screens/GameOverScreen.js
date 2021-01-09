import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import colors from '../constants/colors';

import DefaultStyles from '../constants/default-styles';

import MainButton from '../components/MainButton';
const GameOverScreen = props => {

    const { numberOfRounds, userNumber, restartGame } = props;

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is OVER!</Text>
                <View style={styles.imageContainer}>
                    <Image  //source={require('../assets/success.png')}
                            fadeDuration={750}
                            source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
                            style={styles.image}
                            resizeMode="cover" 
                    />
                </View>
                <View style={styles.resultContainer}>
                    <Text style={[DefaultStyles.bodyText, styles.resultText]}>
                        Your phone took <Text style={styles.highlight}>{numberOfRounds} </Text> 
                        to deduce your number: <Text style={styles.highlight}>{userNumber}</Text>
                    </Text>
                </View>
            <MainButton onPress={restartGame}>
                NEW GAME??
            </MainButton>
        </View>
    );
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    resultContainer: {
        marginVertical: 15,
        marginHorizontal: 25,
    },
    resultText: {
        fontSize: 22,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
    }
});

export default GameOverScreen;