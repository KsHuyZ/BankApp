import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
export interface servicesItem {
  name: string;
  icon: any;
}

const listService = [
  {
    name: 'Wallet',
    icon: require('../assets/images/ic_wallet.png'),
  },
  {
    name: 'Transfer',
    icon: require('../assets/images/ic_transfer.png'),
  },
  {
    name: 'Pay',
    icon: require('../assets/images/ic_pay.png'),
  },
  {
    name: 'Top Up',
    icon: require('../assets/images/ic_topup.png'),
  },
];

const renderServiceItem = (item: servicesItem) => {
  return (
    <View key={item.name} style={styles.items}>
      <View style={styles.icon}>
        <Image source={item.icon} />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

const ListService = () => {
  return (
    <View>
      <Text style={styles.title}>Service</Text>
      <View style={styles.list}>{listService.map(renderServiceItem)}</View>
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
    marginTop: 10,
  },
});
