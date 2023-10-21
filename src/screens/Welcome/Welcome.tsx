import React from 'react';
import {Text, View} from 'react-native';
import {SCREEN} from '../../constants';
import styles from './welcome.styles';
import ButtonPaper from '../../components/ButtonPaper';
import BackgroundImage from '../../components/BackgroundImage';

const {Validate} = SCREEN;

const WelcomeScreen = ({navigation}: any) => {
  return (
    <BackgroundImage>
      <View style={styles.wrapText}>
        <Text style={styles.textTitle}>
          Payments anywhere and anytime easily
        </Text>
        <Text style={styles.textDesc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </Text>
        <View>
          <ButtonPaper onPress={() => navigation.navigate(Validate)}>
            Get Started
          </ButtonPaper>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default WelcomeScreen;
