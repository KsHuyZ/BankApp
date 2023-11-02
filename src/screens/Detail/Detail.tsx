import {View, Text} from 'react-native';
import React from 'react';
import styles from './detail.styles';
import Background from '../../components/Background';
import CardPaper, {CardContent} from '../../components/CardPaper';
import {transactionType} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {SEND} = transactionType;

const Detail = ({route, navigation}: any) => {
  const {transactionId, amount, receiver, time, transactionType, balanceAfter} =
    route.params;
  return (
    <Background title="Detail Transaction" goBack={() => navigation.goBack()}>
      <CardPaper>
        <CardContent>
          <View>
            <View style={styles.detailItem}>
              <View style={styles.detailTitle}>
                <Icon name="bank" style={styles.bankIcon} />
              </View>
              <Text style={styles.amount}>
                {transactionType === SEND ? '-' : '+'} {amount} USD
              </Text>
            </View>
          </View>
        </CardContent>
        <CardContent>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Status:</Text>
            <Text style={styles.successLabel}>Success</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Thời gian:</Text>
            <Text style={styles.detailText}>{time}</Text>
          </View>
        </CardContent>
        <CardContent>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Mã giao dịch:</Text>
            <Text style={styles.detailText}>{transactionId}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Amount:</Text>
            <Text style={styles.detailText}>{amount} USD</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Receive:</Text>
            <Text style={styles.detailText}>
              {receiver.firstName} {receiver.lastName}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Balance:</Text>
            <Text style={styles.detailText}>
              {new Intl.NumberFormat().format(balanceAfter)} USD
            </Text>
          </View>
        </CardContent>
      </CardPaper>
    </Background>
  );
};

export default Detail;
