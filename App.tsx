import React, { useEffect, useCallback, useState, useRef } from 'react';
import { SafeAreaView, StatusBar, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { TOKEN_APP_WEATHER } from '@env';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, ContainerInputs, Input, NewLocation, IconTemp, NameLocation, Header, TextHeader, TextLoading} from './styles';

import Geolocation from '@react-native-community/geolocation';

interface UserLocation {
  latitude: Number;
  longitude: Number;
  name: string;
  weather: {
    temperature: string;
    maxTemperature: string;
    minTemperature: string;
    description: string;
    urlIcon: string;
  }
}

const App = () => {
  const [user, setUser] = useState<UserLocation>();
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState('');
  const [log, setLog] = useState('');
  const logInputRef = useRef<TextInput>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => handleNewLocation({latitude, longitude}));
  }, []);

  // Caso a função seja chamda sem paramêtros, ele vai pegar os valores dos useStates
  const handleNewLocation = useCallback(async ({latitude = Number(lat), longitude = Number(log)}) => {
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${TOKEN_APP_WEATHER}&lang=pt_br`).then(response => response.json()).catch(error => {
      console.error(error);
    });
    setUser({
      latitude, longitude,
      name: `${data.name} - ${data.sys.country}`,
      weather: {
        temperature: (data.main.temp - 273.15).toFixed(1),
        maxTemperature: (data.main.temp_max - 273.15).toFixed(1),
        minTemperature: (data.main.temp_min - 273.15).toFixed(1),
        description: data.weather[0].description,
        urlIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      }
    });
  }, [lat, log, setLoading]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <ContainerInputs>
          <View>
            <Text>Latitude</Text>
            <Input
              placeholder="Digite uma latitude"
              value={lat}
              onChangeText={setLat}
              returnKeyType="next"
              onSubmitEditing={() => logInputRef.current?.focus()}
            />
          </View>
          <View>
            <Text>Longitude</Text>
            <Input
              ref={logInputRef}
              placeholder="Digite uma logitude"
              value={log}
              onChangeText={setLog}
              returnKeyType="done"
            />
          </View>
        </ContainerInputs>

        <NewLocation onPress={handleNewLocation}>
          <Text style={{color: '#fff'}}>Atualizar Localização</Text>
        </NewLocation>
        {loading ? 
          <View style={{marginTop: 20}}>
            <ActivityIndicator size="large" color="#000" />
            <TextLoading>Obtendo sua localização</TextLoading>
          </View> : <>
          {user && (
              <>
                <Header>
                  <IconTemp source={{uri: user.weather.urlIcon}} />
                  <TextHeader>
                    <Text style={{fontSize: 25}}>{user.weather.temperature} °C</Text>
                    <Text style={{color: '#666'}}>({user.weather.description})</Text>
                  </TextHeader>
                </Header>

                <NameLocation>
                  <Icon
                    name="location-on"
                    size={70}
                    color="#222"
                  />
                  <Text style={{fontSize: 24}}>{user.name}</Text>
                </NameLocation>

                <Text>Latitude: {user.latitude}</Text>
                <Text>Longitude: {user.longitude}</Text>
              </>
            )}
          </>
        }
      </Container>
    </>
  );
};

export default App;
