import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #FFF;
`;

export const IconTemp = styled.Image`
  width: 150px;
  height: 150px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextHeader = styled.View`
  align-items: center;
`;

export const TextLoading = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  color: #333;
`;

export const ContainerInputs = styled.View`
  margin-top: 40px;
  height: auto;
  width: 300px;
  flex-direction: row;  
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput`
  width: 145px;
  padding: 4px 10px;
  height: 40px;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 4px;
`;

export const NewLocation = styled.TouchableOpacity`
  margin-top: 10px;
  border-radius: 4px;
  width: 300px;
  padding: 4px 10px;
  height: 40px;
  background: #712;
  align-items: center;
  justify-content: center;
`;

export const NameLocation = styled.View`
  flex-direction: row;
  align-items: center;
`;