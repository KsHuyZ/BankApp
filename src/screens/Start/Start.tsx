import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import {ProgressBar} from 'react-native-paper';
import {getStorage} from '../../utils';
import {storageKey, SCREEN} from '../../constants';
import Card from '../../components/Card';

const {profileKey} = storageKey;
const {Welcome, Login} = SCREEN;

const Start = ({navigation}: any) => {
  const handleGetUserInfor = async () => {
    const userString = await getStorage(profileKey);
    if (userString) {
      return navigation.navigate(Login);
    }
    return navigation.navigate(Welcome);
  };

  useEffect(() => {
    setTimeout(() => handleGetUserInfor(), 1000);
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/images/bg_welcome.png')}
      style={styles.container}>
      <View style={styles.cardSection}>
        <View style={styles.card}>
          <Card />
        </View>
        <Text style={styles.title}>Financial</Text>
        <ProgressBar color={'#fff'} style={styles.progress} indeterminate />
      </View>
    </ImageBackground>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardSection: {
    width: '100%',
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    paddingVertical: 14,
  },
  progress: {
    backgroundColor: '#ffffff33',
  },
});
