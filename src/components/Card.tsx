import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {getStorage} from '../utils';
import {storageKey} from '../constants';
import {useAuth} from '../hooks';

const width_screen = Dimensions.get('window').width;

const {profileKey} = storageKey;

const card_item = width_screen - 24 * 2;

const card_size = {
  width: 325,
  height: 196,
};

const Card = () => {
  const [user, setUser] = useState<ProfileType | null>(null);
  const {profile} = useAuth();
  const handleGetUserInfor = async () => {
    const userString = await getStorage(profileKey);
    setUser(JSON.parse(userString!));
  };
  useEffect(() => {
    handleGetUserInfor();
  }, []);

  const cardNumber = user?.cardNumber?.toString().replace(/\d{4}(?=.)/g, '$& ');

  return (
    <ImageBackground
      source={require('../assets/images/card_visa_bg.png')}
      style={styles.card}>
      <View style={styles.cardIcon}>
        <Image source={require('../assets/images/card_icon.png')} />
      </View>
      <View style={styles.cardNumber}>
        <Text style={styles.cardNumberText}>
          {cardNumber ? cardNumber : '1234 5678 1234 5678'}
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardHolderName}>Card Holder</Text>
          <Text style={styles.cardName}>
            {user ? `${user.firstName} ${user.lastName}` : 'Nguyễn Quang HUy'}
          </Text>
        </View>
        <Image source={require('../assets/images/visa_text.png')} />
      </View>
    </ImageBackground>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: card_item,
    height: (card_item * card_size.height) / card_size.width,
    padding: 24,
  },
  cardNumber: {
    flex: 1,
    justifyContent: 'center',
  },
  cardNumberText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  cardHolderName: {color: 'rgba(255,255,255,0.4)'},
  cardName: {color: 'white', fontSize: 14},
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {},
});
