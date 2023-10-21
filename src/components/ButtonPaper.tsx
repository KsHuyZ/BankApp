import {StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
const ButtonPaper = (props: any) => {
  return (
    <Button
      mode="contained"
      buttonColor="#fff"
      textColor="black"
      labelStyle={styles.buttonText}
      {...props}
    />
  );
};

export default ButtonPaper;
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
