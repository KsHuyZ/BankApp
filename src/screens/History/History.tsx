import {View, Text, FlatList, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../History/History.styles';
import Background from '../../components/Background';
import historyApi from '../../api/historyApi';
import {useAuth, useSocketEvent} from '../../hooks';
import {ActivityIndicator, Button} from 'react-native-paper';
import {transactionType} from '../../utils';
import {LineChart} from 'react-native-chart-kit';
import CardPaper from '../../components/CardPaper';

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

const History = ({navigation}: any) => {
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('All');
  const [showChart, setShowChart] = useState<boolean>(false);
  const {profile, updateProfile} = useAuth();

  const handleGetHistory = async () => {
    setLoading(true);
    const result = await getHistorybyUserId(profile._id);
    setLoading(false);
    setHistory(result.histories);
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  const handleReceiveAmount = ({
    newBalance,
    newHistory,
  }: {
    newBalance: number;
    newHistory: HistoryType;
  }) => {
    updateProfile({...profile, balance: newBalance});
    setHistory(prev => ({...prev, newHistory}));
  };

  useSocketEvent('update_balance', handleReceiveAmount);

  const data = history.filter(his => {
    if (selected === 'Send') {
      return his.transactionType === SEND;
    }
    if (selected === 'Receivied') {
      return his.transactionType === RECEIVED;
    }
    return his;
  });
  const chartData = data.reverse();
  return (
    <Background goBack={() => navigation.goBack()}>
      <View style={styles.contain}>
        <View>
          <Text style={styles.title}>History Transfer</Text>
        </View>
        <Button
          mode="text"
          textColor="#fff"
          onPress={() => setShowChart(prev => !prev)}>
          Statistical
        </Button>
        {showChart ? (
          <CardPaper>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: chartData.map((his: HistoryType) => his.balanceAfter),
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#00000000',
                backgroundGradientFrom: '#00000000',
                backgroundGradientTo: '#00000000',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </CardPaper>
        ) : (
          <></>
        )}
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
                  <Text
                    style={{
                      color: `${
                        item.transactionType === SEND ? 'red' : 'green'
                      }`,
                    }}>
                    {item.transactionType === SEND ? '-' : '+'}{' '}
                    {item.transactionId.amount} USD
                  </Text>
                </View>
                <Text>{item.transactionId.message}</Text>
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
