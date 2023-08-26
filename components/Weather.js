import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index.js';



const Weather = ({ weatherData, fetchWeatherData }) => {

    const [backgroundImage, setBackgroundImage] = useState(null);
    const { weather, name, main: { temp, humidity }, wind: { speed } } = weatherData;
    const [{ main, }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main))
    }, [weatherData]);


    function getBackgroundImg(w) {
        if (w === 'Snow') return snow;
        if (w === 'Clear') return sunny;
        if (w === 'Rain') return rainy;
        if (w === 'Haze') return haze;
        return haze;

    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black';

    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor }}>{temp} ℃</Text>

                </View>
                <View style={ styles.extraInfo } >
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width,
    },
    headerText: {
        fontSize: 36,
        marginTop: 50,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info:{
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius:10,
        justifyContent: 'center',
    }
});

export default Weather
