import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, HelperText} from 'react-native-paper';

import TimeCount from '../../../../components/TimeCount';
import styles from './otp.style';
import ButtonPaper from '../../../../components/ButtonPaper';
import OTPInput from '../../../../components/OTPInput/OTPInput';
import {getStorage} from '../../../../utils';
import {SCREEN, storageKey} from '../../../../constants';
import Background from '../../../../components/Background';
import authApi from '../../../../api/authApi';

const {emailKey} = storageKey;
const {Register, Validate} = SCREEN;
const TypeOTP = ({navigation}: any) => {
  const [code, setCode] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pinReady, setPinReady] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const MAX_LENGTH = 4;
  const handleGetEmail = async () => {
    const emailStorage = await getStorage(emailKey);
    if (emailStorage) {
      setEmail(emailStorage);
    }
  };

  const handleCheckOTP = async () => {
    const {checkOTP} = authApi;
    const res = await checkOTP(code);
    if (res.success) {
      return navigation.navigate(Register);
    }
    if (res.message === 'wrong_otp') {
      setError('Wrong OTP Code');
    }
  };

  const handleRefreshOtp = async () => {
    const {refreshOTP} = authApi;
    const result = await refreshOTP();
    if (result.success) {
      setRefresh(true);
    }
  };

  useEffect(() => {
    handleGetEmail();
  }, []);

  return (
    <Background goBack={() => navigation.navigate(Validate)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Type OTP</Text>
          <Text style={styles.textHeader}>
            The 4-digit authentication code has been sent to email {email}
          </Text>
        </View>
        <View style={styles.inputField}>
          <View style={styles.input}>
            <OTPInput
              code={code}
              setCode={setCode}
              maxLength={MAX_LENGTH}
              setPinReady={setPinReady}
            />
            <HelperText
              style={styles.errorInput}
              type="error"
              visible={error ? true : false}>
              {error}
            </HelperText>
          </View>

          <View style={styles.otpField}>
            <Text style={styles.otpText}>
              OTP Expired In{' '}
              <TimeCount
                setRefresh={() => setRefresh(false)}
                refresh={refresh}
              />
            </Text>
            <Button mode="text" textColor="#fff" onPress={handleRefreshOtp}>
              Resend OTP
            </Button>
          </View>
        </View>
        <ButtonPaper
          disabled={code.length < 4 || loading}
          loading={loading}
          onPress={handleCheckOTP}>
          Continue
        </ButtonPaper>
      </View>
    </Background>
  );
};

export default TypeOTP;
