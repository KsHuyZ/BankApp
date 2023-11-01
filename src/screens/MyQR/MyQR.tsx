import {View, Text} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {useAuth} from '../../hooks';
import styles from './qr.styles';
import CardPaper, {CardContent} from '../../components/CardPaper';
import Background from '../../components/Background';

export default function MyQR({navigation}: any) {
  const {profile} = useAuth();
  return (
    <Background goBack={() => navigation.goBack()}>
      <View style={styles.container}>
        <CardPaper>
          <CardContent>
            <Text style={styles.title}>My QR</Text>
          </CardContent>
          <CardContent>
            <QRCode value={profile.cardNumber.toString()} size={200} />
          </CardContent>
        </CardPaper>
      </View>
    </Background>
  );
}
