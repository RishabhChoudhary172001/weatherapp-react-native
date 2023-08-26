import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

const API_KEY = `cb23345ac3b26ba6b4b8bac501631da7`;

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

 

  const fetchWeatherData = async (cityName) => {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      }
      else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (err) {
      console.log(err);
      fetchWeatherData('Dubai');
    }
  }

  useEffect(() => {
    fetchWeatherData('Dubai');
    console.log(weatherData);
  }, [])

  if(!loaded){
    return (<View style={styles.container}>
      <ActivityIndicator color='gray' size={40}/>
    </View>)
  }
  else if(!weatherData){
    return (
      <View style={styles.container}>
       <Text>Please Enter Correct Name</Text> 
      </View>
      
    )
  }
  return (
      <View style={styles.container}>
        <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
        <StatusBar style='auto'/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
