import React from 'react';
import {Image, StyleSheet, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import FontAS from 'react-native-vector-icons/FontAwesome6';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN} from '../constants/index';
export interface servicesItem {
  name: string;
  icon: any;
}
const fontSize = 25;

const {Transaction} = SCREEN;

const listService = [
  {
    name: 'My Wallet',
    icon: <AntdIcon name="wallet" style={{fontSize}} />,
  },
  {
    name: 'Transfer',
    navigate: Transaction,
    icon: <FontAS name="arrow-right-arrow-left" style={{fontSize}} />,
  },
  {
    name: 'QR Pay',
    icon: <MCI name="line-scan" style={{fontSize}} />,
  },
  {
    name: 'My QR',
    icon: <AntdIcon name="qrcode" style={{fontSize}} />,
  },
];

const ListService = ({navigate}: {navigate: (screen: string) => void}) => {
  return (
    <View>
      <Text style={styles.title}>Service</Text>
      <View style={styles.list}>
        {listService.map(item => (
          <TouchableOpacity
            key={item.name}
            style={styles.items}
            onPress={() => navigate(item.navigate)}>
            <View style={styles.icon}>{item.icon}</View>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ListService;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  icon: {
    padding: 10,
    backgroundColor: 'white',
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {height: 10, width: 2},
    shadowOpacity: 0.7,
    shadowRadius: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    // marginTop: 10,
  },
});
