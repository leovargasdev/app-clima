import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #FFF;
`;

export const ContainerInputs = styled.View`
  flex-direction: row;  
  align-items: center;
  justify-content: space-between;
  width: 300px;
`;

export const Input = styled.TextInput`
  width: 145px;
  height: 40px;
  padding: 4px 10px;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 4px;
`;

export const NewLocation = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  width: 300px;
  height: 40px;

  border-radius: 4px;
  background: #3F84E5;
`;

export const Temperature = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TemperatureIcon = styled.Image`
  width: 150px;
  height: 150px;
`;

export const NameLocation = styled.View`
  flex-direction: row;
  align-items: center;
`;