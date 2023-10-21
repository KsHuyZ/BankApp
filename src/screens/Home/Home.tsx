import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import ListService from '../../components/ListServices';
import RecentTransaction from '../../components/RecentTransaction';
import styles from './home.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text>Hello</Text>
            <Text style={styles.userName}>My Name</Text>
          </View>
          <Image source={require('../../assets/images/ic_notif.png')} />
        </View>
        <View style={styles.card}>
          <Card />
        </View>
        <ListService />
        <RecentTransaction />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
