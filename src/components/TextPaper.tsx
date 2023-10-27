import {Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';

const TextPaper = (props: any) => {
  return <Text style={{...styles.textColor, ...props.style}} {...props} />;
};

export default TextPaper;

const styles = StyleSheet.create({
  textColor: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
