import React, { useEffect, useCallback, useState, useRef } from 'react';
import { SafeAreaView, StatusBar, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { TOKEN_APP_WEATHER } from '@env';

import {Container, ContainerInputs, Input, NewLocation, IconTemp, Header, TextHeader, TextLoading} from './styles';

import Geolocation from '@react-native-community/geolocation';

const addressUser = {
  city: 'aasdasdas',
  street: 'aasdasdas',
  region: 'aasdasdas',
  country: 'aasdasdas',
  postalCode: 'aasdasdas',
  name: 'aasdasdas',
};

interface UserLocation {
  latitude: Number;
  longitude: Number;
  address: Object;
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
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = JSON.stringify(position);
        handleNewLocation({latitude, longitude});
      },
      error => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  Geolocation.getCurrentPosition(info => console.log(info));
  // Caso a função seja chamda sem paramêtros, ele vai pegar os valores dos useStates
  const handleNewLocation = useCallback(async ({latitude = Number(lat), longitude = Number(log)}) => {
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${TOKEN_APP_WEATHER}&lang=pt_br`).then(response => response.json()).catch(error => {
      console.error(error);
    });
    setUser({
      latitude, longitude,
      address: addressUser,
      weather: {
        temperature: (data.main.temp - 273.15).toFixed(1),
        maxTemperature: (data.main.temp_max - 273.15).toFixed(1),
        minTemperature: (data.main.temp_min - 273.15).toFixed(1),
        description: data.weather[0].description,
        urlIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      }
    });
    console.log(user);
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
                <Text>Pais: {user.address.country}</Text>
                <Text>Cidade: {user.address.city} - {user.address.region}</Text>
                <Text>Endereço: {user.address.name}</Text>
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
