import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, FlatList} from 'react-native';
import styles from '../Notification/Notification.styles';
const data = [
  {
    time: 'Chuyển tiền . 21 giờ trước',
    content: 'Chuyển tiền thành công',
    detail:
      'Bạn đã chuyển tiền thành công số tiền 92.000đ đến TRINH THI THANH THUY (Vietcombank), số tài khoản 1031004879.',
  },
  {
    time: 'Chuyển tiền . 21 giờ trước',
    content: 'Chuyển tiền thành công',
    detail:
      'Bạn đã chuyển tiền thành công số tiền 92.000đ đến TRINH THI THANH THUY (Vietcombank), số tài khoản 1031004879.',
  },
  {
    time: 'Chuyển tiền . 21 giờ trước',
    content: 'Chuyển tiền thành công',
    detail:
      'Bạn đã chuyển tiền thành công số tiền 92.000đ đến TRINH THI THANH THUY (Vietcombank), số tài khoản 1031004879.',
  },
  {
    time: 'Chuyển tiền . 21 giờ trước',
    content: 'Chuyển tiền thành công',
    detail:
      'Bạn đã chuyển tiền thành công số tiền 92.000đ đến TRINH THI THANH THUY (Vietcombank), số tài khoản 1031004879.',
  },
  {
    time: 'Chuyển tiền . 21 giờ trước',
    content: 'Chuyển tiền thành công',
    detail:
      'Bạn đã chuyển tiền thành công số tiền 92.000đ đến TRINH THI THANH THUY (Vietcombank), số tài khoản 1031004879.',
  },
  {
    time: 'Chuyển tiền . 21 giờ trước',
    content: 'Chuyển tiền thành công',
    detail:
      'Bạn đã chuyển tiền thành công số tiền 92.000đ đến TRINH THI THANH THUY (Vietcombank), số tài khoản 1031004879.',
  },
];
const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Notification</Text>
      </View>
      <View style={styles.tit}>
        <Text style={styles.text1}>Important</Text>
        <Text style={styles.text1}>Special offers</Text>
        <Text style={styles.text1}>Interact</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.noti}>
            <View>
              <Text>{item.time}</Text>
              <Text>{item.content}</Text>
            </View>
            <Text>{item.detail}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Notification;
