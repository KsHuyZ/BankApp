import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const Background = ({children, goBack, title}: any) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg_welcome.png')}
      style={styles.container}>
      <View style={styles.inside}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backICon} onPress={() => goBack()}>
            <Icon name="left" size={35} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
        </View>
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
    position: 'relative',
  },
  inside: {
    height: '95%',
    flexDirection: 'column',
    paddingVertical: 10,
    padding: 20,
  },
  backICon: {
    position: 'absolute',
    top: -5,
    left: 0,
  },
  text: {
    textAlign: 'center', // Center the text
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Remove textAlign:'center' from here
  },
});
