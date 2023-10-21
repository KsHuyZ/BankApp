import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

const Background = ({children, goBack}: any) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg_welcome.png')}
      style={styles.container}>
      <View style={styles.inside}>
        <TouchableOpacity style={styles.backICon} onPress={() => goBack()}>
          <Icon name="left" size={35} color="#fff" />
        </TouchableOpacity>
        {children}
      </View>
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inside: {
    height: '95%',
    flexDirection: 'column',
    paddingVertical: 10,
  },
  backICon: {
    marginHorizontal: 20,
  },
});
