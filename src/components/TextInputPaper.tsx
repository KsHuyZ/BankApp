import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput, HelperText, TextInputProps} from 'react-native-paper';

interface TextInputPaperProps extends TextInputProps {
  errorMessage?: string;
}

const TextInputPaper = (props: TextInputPaperProps) => {
  const {errorMessage} = props;
  return (
    <View style={styles.textInput}>
      <TextInput
        mode="outlined"
        outlineColor="#ffffff00"
        activeOutlineColor="#fff"
        placeholderTextColor="#feffff"
        textColor="#feffff"
        style={styles.input}
        error={errorMessage ? true : false}
        {...props}
      />
      <HelperText type="error" visible={errorMessage ? true : false}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

export const TextInputFlat = (props: TextInputPaperProps) => {
  const {errorMessage} = props;
  return (
    <View style={styles.textInput}>
      <TextInput
        mode="flat"
        underlineColor="black"
        activeUnderlineColor="black"
        style={styles.inputFlat}
        error={errorMessage ? true : false}
        {...props}
      />
      <HelperText type="error" visible={errorMessage ? true : false}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

export default TextInputPaper;

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  input: {
    backgroundColor: '#ffffff33',
    width: '100%',
  },
  inputFlat: {
    backgroundColor: 'transapent',
    width: '100%',
  },
});
