import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from '../Notification/Notification.styles';
import Background from '../../components/Background';
import {useAuth} from '../../hooks';
import notificationApi from '../../api/notificationApi';
import {calFromDate, transactionType} from '../../utils';
import {SCREEN} from '../../constants';

const {Detail, Home} = SCREEN;

const {SEND} = transactionType;

const {getNotificationByUserId, seenNotifi} = notificationApi;

const Notification = ({navigation}: any) => {
  const {profile} = useAuth();
  const [notifications, setNotifications] = useState<NotifiType[]>([]);
  const handleGetNotification = async () => {
    const notification = await getNotificationByUserId(profile._id);
    setNotifications(notification);
  };

  const handleNavigate = (item: NotifiType) => {
    if (!item.seen) {
      seenNotifi(item._id);
      const newNotications = notifications.map(noti => {
        if (noti._id === item._id) {
          return {...noti, seen: true};
        }
        return noti;
      });
      setNotifications(newNotications);
    }
    navigation.navigate(Detail, {
      transactionId: item.historyId.transactionId._id,
      amount: item.historyId.transactionId.amount,
      receiver: item.historyId.transactionId.toUser,
      time: item.historyId.time,
      type: item.historyId.transactionType,
      balanceAfter: item.historyId.balanceAfter,
    });
  };

  useEffect(() => {
    handleGetNotification();
  }, []);

  return (
    <Background goBack={() => navigation.replace(Home)} title="Notification">
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.noti}
              onPress={() => handleNavigate(item)}>
              <View>
                <Text>{calFromDate(item.historyId?.time)}</Text>
                <View style={styles.titleSection}>
                  <Text style={styles.titleTransfer}>
                    {item.historyId?.transactionType === SEND
                      ? 'Tranfer'
                      : `Received from ${item.historyId?.transactionId.fromUser.firstName} ${item.historyId.transactionId.fromUser.lastName}`}
                  </Text>
                  {!item.seen ? <View style={styles.unseen} /> : <></>}
                </View>
              </View>
              <Text>
                {item.historyId.transactionType === SEND
                  ? `You are transfer success ${item.historyId.transactionId.amount} USD to ${item.historyId.transactionId.toUser.firstName} ${item.historyId.transactionId.toUser.lastName}, card number ${item.historyId.transactionId.toUser.cardNumber}`
                  : `Received ${item.historyId.transactionId.amount}`}
              </Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Notification;
