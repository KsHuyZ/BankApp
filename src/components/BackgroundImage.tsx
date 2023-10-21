import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BackgroundImage = ({children}: any) => {
  const [layouts, setLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={require('../assets/images/bg_welcome.png')}
      style={{paddingTop: insets.top, flex: 1, justifyContent: 'center'}}>
      <View>
        <View style={styles.logoView}>
          <View onLayout={({nativeEvent}) => setLayout(nativeEvent?.layout)}>
            {layouts && (
              <Image
                source={require('../assets/images/card_welcome_1.png')}
                style={[
                  styles.cardImg1,
                  {width: layouts.width, height: layouts.height},
                ]}
                resizeMode="contain"
              />
            )}
            <Image source={require('../assets/images/card_welcome_2.png')} />
          </View>
        </View>
        {children}
      </View>
    </ImageBackground>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  cardImg1: {
    position: 'absolute',
    zIndex: 2,
    bottom: 30,
  },
});
