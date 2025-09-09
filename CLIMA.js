import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WEATHER_API_KEY } from '@env'; // Import API key from environment variables

// Main Weather App Component - Renamed class to WeatherApp
export default class WeatherApp extends Component {
  constructor(props) {
    super(props);
    // Component state: stores weather data and UI colors
    // State properties now in English
    this.state = {
      temperature: "0",      // Current temperature
      windSpeed: " ",        // Wind speed
      rainChance: " ",       // Rain probability
      city: " ",             // City name input
      backgroundGradient: ['#3390f3ff', '#adebfeff'], // Default gradient background (day)
    };
  }

  // Function to fetch weather data from WeatherAPI - Renamed function
  fetchWeatherData = () => {
    console.log("Fetching weather data...");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      // When request is complete and successful
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const weatherData = JSON.parse(xhttp.responseText);
        console.log(weatherData);

        // Update state with API data using English properties
        this.setState({
          temperature: weatherData.current.temp_c,
          windSpeed: weatherData.current.wind_kph,
          rainChance: weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
          // Change background based on day/night
          backgroundGradient: weatherData.current.is_day
            ? ['#3390f3ff', '#adebfeff'] // Day gradient
            : ['#213448', '#547792', '#82a6b4ff'], // Night gradient
        });
      }
    };

    // API request for forecast, using 'this.state.city'
    xhttp.open(
      "GET", `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${this.state.city}&days=1&aqi=no&alerts=no`, true
    );
    xhttp.send();
  };

  render() {
    return (
      // Background gradient changes based on day/night
      <LinearGradient
        colors={this.state.backgroundGradient}
        style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}
      >
        {/* Title */}
        <Text style={{
          marginTop: 80,
          color: "#ffffffff",
          fontSize: 60,
          fontFamily: 'Asimovian_400Regular',
          textShadowColor: '#e5d9f2e2',
          textShadowOffset: { width: 2, height: 1 },
          textShadowRadius: 5,
        }}>
          Weather
        </Text>

        {/* Search bar */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: "#e8f9fd8a",
          borderRadius: 40,
          width: 350,
          height: 45,
          marginTop: 20,
          paddingHorizontal: 10
        }}>
          {/* Search button */}
          <TouchableOpacity onPress={this.fetchWeatherData}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/64/64673.png' }}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
          </TouchableOpacity>

          {/* City input */}
          <TextInput
            placeholder="Search city..."
            style={{ flex: 1 }}
            onChangeText={(text) => this.setState({ city: text })}
          />
        </View>

        {/* Temperature display with cloud image */}
        <View style={{ marginTop: 40, width: 350, height: 200, alignItems: 'center', overflow: 'visible' }}>
          <Image
            source={{ uri: 'https://www.seekpng.com/png/full/147-1470745_dibujos-de-nubes-png.png' }}
            style={{ width: '93%', height: '85%' }}
          />
          <Text style={{
            position: 'absolute',
            top: 18,
            transform: [{ translateX: 10 }],
            color: "#65c3caff",
            fontSize: 90,
            fontFamily: 'Kanit_500Medium',
          }}>
            {this.state.temperature}°c
          </Text>
        </View>

        {/* Wind speed */}
        <View style={{
          left: -100,
          alignItems: 'center'
        }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4005/4005837.png' }}
            style={{ width: 80, height: 80 }}
          />
          <Text style={{
            fontFamily: 'Kanit_500Medium',
            fontSize: 20,
            color: '#FBF9F1',
            textShadowColor: '#e2ccf990',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
            {this.state.windSpeed} km/h
          </Text>
        </View>

        {/* Rain probability */}
        <View style={{
          left: 100,
          alignItems: 'center',
          marginTop: -120
        }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4336/4336258.png' }}
            style={{ width: 90, height: 90 }}
          />
          <Text style={{
            fontFamily: 'Kanit_500Medium',
            fontSize: 20,
            color: '#FBF9F1',
            textShadowColor: '#e2ccf990',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
            {this.state.rainChance}%
          </Text>
        </View>
      </LinearGradient>
    );
  }
}