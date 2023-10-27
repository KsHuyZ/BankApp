import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../History/History.styles';

const data = [
  {
    time: '9:50 23/10/2023',
    amount: 15000,
    detail: '883799-NGUYEN PHAM ANH VU Chuyen Tien',
    type: "deacrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 25000,
    detail: '883799-PHAN TIEN HUY Chuyen Tien',
    type: "deacrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 55000,
    detail: '883799-VUONG CONG HOANG Chuyen Tien',
  },
  {
    time: '9:50 23/10/2023',
    amount: 110000,
    detail: '883799-NGUYEN VAN A Chuyen Tien',
    type: "acrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 159000,
    detail: '883799-NGUYEN VAN B Chuyen Tien',
    type: "deacrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 158000,
    detail: '883799-NGUYEN VAN C Chuyen Tien',
    type: "acrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 157000,
    detail: '883799-NGUYEN VAN D Chuyen Tien',
    type: "acrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 150600,
    detail: '883799-NGUYEN VAN E Chuyen Tien',
    type: "deacrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 154000,
    detail: '883799-NGUYEN VAN F Chuyen Tien',
    type: "acrease",
  },
  {
    time: '9:50 23/10/2023',
    amount: 23000,
    detail: '883799-NGUYEN VAN G Chuyen Tien',
    type: "deacrease",
  },
];

const History = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <View>
          <Text> Danh sách giao dịch</Text>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={styles.Time}>
              <Text>{item.time}</Text>
              <Text style={{color: `${item.type === 'deacrease' ? 'red': 'green'}`}}>{item.type === 'deacrease' ? '-': '+'} {item.amount} VND</Text>
            </View>
            <Text>{item.detail}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default History;
