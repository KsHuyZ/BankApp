import React, {useEffect, useState} from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import ListService from '../../components/ListServices';
import RecentTransaction from '../../components/RecentTransaction';
import styles from './home.styles';
import {getStorage} from '../../utils';
import {storageKey} from '../../constants';

const {profileKey} = storageKey;

const HomeScreen = ({navigation}: any) => {
  const [user, setUser] = useState<ProfileType | null>(null);

  const handleGetUserInfor = async () => {
    const userString = await getStorage(profileKey);
    setUser(JSON.parse(userString!));
  };
  useEffect(() => {
    handleGetUserInfor();
  }, []);

  const handleNavigateScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text>Hello</Text>
            <Text style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
          <Image source={require('../../assets/images/ic_notif.png')} />
        </View>
        <View style={styles.card}>
          <Card />
        </View>
        <ListService navigate={handleNavigateScreen} />
        <RecentTransaction navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
