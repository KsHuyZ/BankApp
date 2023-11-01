import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../History/History.styles';
import Background from '../../components/Background';
import historyApi from '../../api/historyApi';
import {useAuth} from '../../hooks';
import {ActivityIndicator, Button} from 'react-native-paper';
import {transactionType} from '../../utils';

const {RECEIVED, SEND} = transactionType;

const {getHistorybyUserId} = historyApi;

const btnList = [
  {
    title: 'All',
  },
  {
    title: 'Send',
  },
  {
    title: 'Receivied',
  },
];

const History = () => {
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('All');
  const {profile} = useAuth();

  const handleGetHistory = async () => {
    setLoading(true);
    const result = await getHistorybyUserId(profile._id);
    setLoading(false);
    setHistory(result.histories);
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  const data = history.filter(his => {
    if (selected === 'Send') {
      return his.transactionType === SEND;
    }
    if (selected === 'Receivied') {
      return his.transactionType === RECEIVED;
    }
    return his;
  });

  return (
    <Background>
      <View style={styles.contain}>
        <View>
          <Text style={styles.title}> Danh sách giao dịch</Text>
        </View>
        <View style={styles.optionSection}>
          {btnList.map((btn, index) => (
            <Button
              key={index}
              mode={btn.title === selected ? 'outlined' : 'text'}
              textColor={btn.title === selected ? 'black' : '#fff'}
              style={btn.title === selected ? {backgroundColor: '#fff'} : {}}
              onPress={() => setSelected(btn.title)}>
              {btn.title}
            </Button>
          ))}
        </View>
        {loading ? (
          <ActivityIndicator animating={true} color={'black'} />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.container}>
                <View style={styles.Time}>
                  <Text>{item.time}</Text>
                  <Text style={{color: 'green'}}>+{item.ammount} VND</Text>
                </View>
                <Text>{item.message}</Text>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptySection}>
            <Text style={styles.emptyText}>History is empty</Text>
          </View>
        )}
      </View>
    </Background>
  );
};

export default History;
