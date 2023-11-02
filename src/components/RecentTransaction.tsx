import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import historyApi from '../api/historyApi';
import {useAuth} from '../hooks';
import {ActivityIndicator, Button} from 'react-native-paper';
import historyStyles from '../screens/History/History.styles';
import {transactionType} from '../utils';
import {SCREEN} from '../constants/index';
import { NavigationProp } from '@react-navigation/native';

const {getHistoryLimit} = historyApi;
const {SEND} = transactionType;
const {History} = SCREEN;

const renderTransactionItem = (item: HistoryType) => (
  <View style={historyStyles.container} key={item._id}>
    <View style={historyStyles.Time}>
      <Text>{item.time}</Text>
      <Text
        style={{color: `${item.transactionType === SEND ? 'red' : 'green'}`}}>
        {item.transactionType === SEND ? '-' : '+'} {item.transactionId?.amount}{' '}
        USD
      </Text>
    </View>
    <Text>{item.transactionId?.message}</Text>
  </View>
);

const RecentTransaction = ({navigation}: any) => {
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {profile} = useAuth();

  const handleGetHistory = async () => {
    setLoading(true);
    const result = await getHistoryLimit(profile._id);
    setLoading(false);
    setHistory(result.histories);
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transaction</Text>
      <View style={styles.list}>
        {loading ? (
          <ActivityIndicator animating={true} color={'black'} />
        ) : history.length > 0 ? (
          <>
            {history.map(renderTransactionItem)}
            <Button
              textColor="black"
              onPress={() => navigation.navigate(History)}>
              See more
            </Button>
          </>
        ) : (
          <Text>History is empty</Text>
        )}
      </View>
    </View>
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    paddingVertical: 20,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
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
  itemBody: {
    flex: 1,
    paddingLeft: 14,
  },

  type: {
    fontWeight: '500',
    fontSize: 16,
  },

  date: {
    marginTop: 5,
  },

  payment: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {},
});
