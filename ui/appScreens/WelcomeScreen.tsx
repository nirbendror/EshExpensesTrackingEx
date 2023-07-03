import React, { useContext } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { UserContext } from '../../providers/UserProvider';

import { CustomButton } from '../UIComponents/UILab';
import { BACKGROUND_COLOR } from '../../const';

const WelcomeScreen: React.FC = () => {
  const {handleLogin} = useContext(UserContext)
  const [userName, setUserName] = React.useState('')
  const isLoginDisabled = userName.length === 0

  const onLoginPress = () => {
    handleLogin(userName)
  }

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <View style={styles.WelcomeScreenView}>
            <TextInput
                style={styles.welcomeTextInpu}
                onChangeText={setUserName}
                value={userName}
                placeholder={'Enter Name'}
                placeholderTextColor={'#D3D3D3'}
            />
      </View>
      <CustomButton text={'Login'} onPress={onLoginPress} disabled={isLoginDisabled}/>
    </View>
  )
}

const styles = StyleSheet.create({
  WelcomeScreenView: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'center'
  },
  welcomeTextInpu: {
      borderWidth: 1,
      borderColor: '#5E57AC',
      color:'#5E57AC',
      padding: 10,
      fontSize: 18,
      width: 255,
      height: 55,
      top: 280,
      paddingTop: 20
  }
})


export default WelcomeScreen