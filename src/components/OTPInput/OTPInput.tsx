import {TextInput, View, Pressable, Text} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './input.styles';
import {TextInputProps} from 'react-native';
import type {SetStateAction} from 'react';

interface HiddenTextInputProps extends TextInputProps {
  code: string;
  setCode: SetStateAction<string>;
  setPinReady: SetStateAction<boolean>;
}

const OTPInput = ({
  code,
  setCode,
  setPinReady,
  maxLength,
  ...props
}: HiddenTextInputProps) => {
  const codeDigitArray = new Array(maxLength).fill(0);
  const textInputRef = useRef<TextInput>(null);
  const [inputContainerIsFocused, setInputContainerIsFocused] =
    useState<boolean>(false);
  const handleBlur = () => {
    setInputContainerIsFocused(false);
  };

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef.current?.focus();
  };

  useEffect(() => {
    setPinReady(code.length === Number(maxLength));
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_: any, index: number) => {
    const emptyInputChar = '';
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === Number(maxLength) - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    const digitFocus = inputContainerIsFocused && isDigitFocused;
    const styleUsed = !digitFocus
      ? styles.otpInput
      : {...styles.otpInput, ...styles.otpInputFocus};
    return (
      <View key={index} style={styleUsed}>
        <Text style={styles.otpInputText}>{digit}</Text>
      </View>
    );
  };
  return (
    <View style={styles.inputSection}>
      <Pressable onPress={handleOnPress} style={styles.otpContainer}>
        {codeDigitArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        style={styles.input}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        onBlur={handleBlur}
        ref={textInputRef}
        {...props}
      />
    </View>
  );
};
export default OTPInput;
