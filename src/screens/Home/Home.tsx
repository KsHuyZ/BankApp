import React, {useEffect, useState} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import ListService from '../../components/ListServices';
import RecentTransaction from '../../components/RecentTransaction';
import styles from './home.styles';
import {getStorage} from '../../utils';
import {SCREEN, storageKey} from '../../constants';
import notificationApi from '../../api/notificationApi';
import {useSocketEvent} from '../../hooks';

const {profileKey} = storageKey;
const {getUnseenNotifi} = notificationApi;
const {Notification} = SCREEN;

const HomeScreen = ({navigation}: any) => {
  const [user, setUser] = useState<ProfileType | null>(null);
  const [numNoti, setNumNoti] = useState(0);
  const handleGetUserInfor = async () => {
    const userString = await getStorage(profileKey);
    setUser(JSON.parse(userString!));
  };

  const handleGetNotifiUnseen = async () => {
    const userString = await getStorage(profileKey);
    const userJSON = JSON.parse(userString!);
    const number = await getUnseenNotifi(userJSON._id);
    setNumNoti(number);
  };

  useEffect(() => {
    handleGetUserInfor();
    handleGetNotifiUnseen();
  }, []);

  const handleNavigateScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleGetNewNoti = () => {
    setNumNoti(prev => prev + 1);
  };

  useSocketEvent('new_noti', handleGetNewNoti);

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
          <TouchableOpacity
            style={styles.notiIcon}
            onPress={() => navigation.replace(Notification)}>
            {numNoti > 0 ? (
              <Text style={styles.numUnseen}>{numNoti}</Text>
            ) : (
              <></>
            )}

            <Image source={require('../../assets/images/ic_notif.png')} />
          </TouchableOpacity>
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
