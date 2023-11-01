import {ImageBackground, Text, View} from 'react-native';
import React from 'react';
import CardPaper, {CardContent} from '../../../components/CardPaper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import styles from './transfer.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCREEN} from '../../../constants/index';
import {getCurrentTime} from '../../../utils';
const {Home, Transaction} = SCREEN;
const TransferSuccess = ({route, navigation}: any) => {
  const {success, amount, time} = route.params;
  const iconStyle = success
    ? styles.successIcon
    : {...styles.successIcon, color: 'red'};
  return (
    <ImageBackground
      source={require('../../../assets/images/bg_welcome.png')}
      style={styles.container}>
      <View style={styles.contain}>
        <CardPaper>
          <CardContent>
            <Icon
              name={`${success ? 'checkmark-done' : 'close'}-circle-outline`}
              style={iconStyle}
            />
          </CardContent>
          <CardContent>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Transfer success</Text>
              <Text style={styles.amountTransfer}>
                {new Intl.NumberFormat().format(amount)} USD
              </Text>
            </View>
          </CardContent>
          <CardContent>
            <View style={styles.titleSection}>
              <View style={styles.transferSection}>
                <Text>Time</Text>
                <Text>{success ? time : getCurrentTime()}</Text>
              </View>
            </View>
          </CardContent>
          <CardContent>
            <View style={styles.footerSection}>
              <TouchableHighlight style={styles.cancelBtn}>
                <Text
                  style={styles.cancelBtnText}
                  onPress={() => navigation.replace(Home)}>
                  Back to Main
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.newTrasBtn}>
                <Text
                  style={styles.newTransText}
                  onPress={() => navigation.replace(Transaction)}>
                  New Transfer
                </Text>
              </TouchableHighlight>
            </View>
          </CardContent>
        </CardPaper>
      </View>
    </ImageBackground>
  );
};

export default TransferSuccess;
