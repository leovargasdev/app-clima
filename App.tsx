import React, { useEffect, useCallback, useState, useRef } from 'react';
import { StatusBar, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { TOKEN_APP_WEATHER } from '@env';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';

import {
  Container,
  ContainerInputs,
  Input,
  NewLocation,
  Temperature,
  TemperatureIcon,
  NameLocation
} from './styles';

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
  const [long, setLong] = useState('');
  const logInputRef = useRef<TextInput>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setLat(latitude.toFixed(4).toString());
      setLong(longitude.toFixed(4).toString());
      handleNewLocation();
    });
  }, []);
  // Atualizando dados climaticos
  const handleNewLocation = useCallback(async () => {
    setLoading(true);

    const latitude = Number(lat);
    const longitude = Number(long);
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${TOKEN_APP_WEATHER}&lang=pt_br`)
    .then(response => response.json())
    .catch(error => { console.error(error) });
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
    // Adicionando delay para fazer uma animação de spinning
    setTimeout(function(){setLoading(false)}, 1000);
  }, [lat, long, setLoading]);

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
              value={long}
              onChangeText={setLong}
              returnKeyType="done"
            />
          </View>
        </ContainerInputs>

        <NewLocation onPress={handleNewLocation}>
          <Icon
            name="location-searching"
            size={18}
            color="#FFF"
          />
          <Text style={{color: '#fff', paddingLeft: 5}}>Atualizar Localização</Text>
        </NewLocation>

        {loading ? 
          <View style={{marginTop: 20}}>
            <ActivityIndicator size="large" color="#000" />
            <Text>Obtendo sua localização</Text>
          </View> : <>
          {user && (
              <>
                <Temperature>
                  <TemperatureIcon source={{uri: user.weather.urlIcon}} />
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 25}}>{user.weather.temperature} °C</Text>
                    <Text style={{color: '#666'}}>({user.weather.description})</Text>
                  </View>
                </Temperature>

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
