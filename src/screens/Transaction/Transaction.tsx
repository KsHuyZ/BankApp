import {ScrollView, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardPaper, {CardContent} from '../../components/CardPaper';
import Background from '../../components/Background';
import {Card, TextInput} from 'react-native-paper';
import styles from './transaction.styles';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextPaper from '../../components/TextPaper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useAuth, useSocketEvent} from '../../hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import userApi from '../../api/userApi';
import TextInputPaper, {TextInputFlat} from '../../components/TextInputPaper';
import ButtonPaper from '../../components/ButtonPaper';
import {formatNumber, newNotification, socketEmit} from '../../utils';
import {SCREEN} from '../../constants/index';

type TransferType = {
  cardNumber: string;
  amount: number;
  message: string;
};

const {TransferSuccess} = SCREEN;

const {getUserNamebyCardNumber} = userApi;

const Transaction = ({navigation}: any) => {
  const {profile, updateProfile} = useAuth();

  const schema = Yup.object().shape({
    cardNumber: Yup.number().required('Please enter card number'),
    amount: Yup.number().required('Please enter money').max(profile.balance),
    message: Yup.string(),
  });

  const [showMoney, setShowMoney] = useState<boolean>(false);
  const [nameReceiving, setNameReceiving] = useState({
    show: false,
    name: '',
    loading: false,
    error: '',
  });

  const handleTransferResult = ({
    newBalance,
    success,
    amount,
    time,
    toUser,
  }: {
    newBalance: number;
    success: boolean;
    amount: number;
    time: string;
    toUser: string;
  }) => {
    if (success) {
      updateProfile({...profile, balance: newBalance});
    }
    newNotification(
      `You have successfully transferred the amount of ${new Intl.NumberFormat().format(
        amount,
      )} to ${toUser}`,
    );
    navigation.replace(TransferSuccess, {
      success,
      amount,
      time,
      toUser,
    });
  };

  useSocketEvent('update_balance', handleTransferResult);

  const handleGetUserName = async (cardNumber: string) => {
    if (cardNumber === '') {
      return;
    }

    if (Number(cardNumber) === Number(profile.cardNumber)) {
      return setNameReceiving(prev => ({
        ...prev,
        loading: false,
        show: false,
        error: 'Cannot transfer money to yourself',
      }));
    }
    setNameReceiving(prev => ({
      ...prev,
      show: true,
      loading: true,
    }));
    const res = await getUserNamebyCardNumber(cardNumber);
    if (res.success) {
      return setNameReceiving(prev => ({
        ...prev,
        name: res.name,
        loading: false,
      }));
    }
    if (res.message === 'not_exist') {
      setNameReceiving(prev => ({
        ...prev,
        error: 'Account are not available',
        loading: false,
        show: false,
      }));
    }
  };

  const handleTransfer = (values: TransferType) => {
    socketEmit('transaction', {...values, fromUserId: profile._id});
  };

  return (
    <Background goBack={() => navigation.goBack()} title="Transaction">
      <Formik
        initialValues={{
          cardNumber: '',
          amount: '',
          message: '',
        }}
        validationSchema={schema}
        onSubmit={handleTransfer}>
        {({values, errors, handleSubmit, handleChange, isValid}) => (
          <ScrollView>
            <View style={styles.container}>
              <CardPaper>
                <CardContent>
                  <View style={styles.remainSection}>
                    <TextPaper variant="bodyMedium">Remain</TextPaper>
                    <View style={styles.moneySection}>
                      <TextPaper variant="bodyMedium">
                        {showMoney
                          ? `$ ${new Intl.NumberFormat().format(
                              profile.balance,
                            )}`
                          : '********'}
                      </TextPaper>
                      <TouchableOpacity>
                        <Icon
                          name={`eye${showMoney ? '' : '-off'}`}
                          style={styles.text}
                          onPress={() => setShowMoney(prev => !prev)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </CardContent>
              </CardPaper>
              <CardPaper>
                <CardContent>
                  <TextInputFlat
                    label={'Account Receiving'}
                    onChangeText={handleChange('cardNumber')}
                    value={values.cardNumber}
                    keyboardType="number-pad"
                    onBlur={() => handleGetUserName(values.cardNumber)}
                    onFocus={() =>
                      setNameReceiving(prev => ({...prev, error: ''}))
                    }
                    errorMessage={
                      nameReceiving.error && nameReceiving.error.length > 0
                        ? nameReceiving.error
                        : errors.cardNumber
                    }
                  />
                </CardContent>
                {nameReceiving.show ? (
                  <CardContent>
                    {nameReceiving.loading ? (
                      <SkeletonPlaceholder borderRadius={4}>
                        <SkeletonPlaceholder.Item
                          flexDirection="column"
                          alignItems="flex-start"
                          justifyContent="space-between">
                          <SkeletonPlaceholder.Item
                            width={60}
                            height={30}
                            borderRadius={20}
                          />
                          <SkeletonPlaceholder.Item
                            width={200}
                            height={30}
                            borderRadius={20}
                          />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder>
                    ) : (
                      <TextInputFlat
                        label={'Receiving Name'}
                        value={nameReceiving.name}
                        disabled
                      />
                    )}
                  </CardContent>
                ) : (
                  <></>
                )}
              </CardPaper>
              <CardPaper>
                <CardContent>
                  <TextInputFlat
                    label={'Amount'}
                    onChangeText={handleChange('amount')}
                    value={values.amount}
                    errorMessage={errors.amount}
                    keyboardType="number-pad"
                    right={<TextInput.Affix text="USD" />}
                  />
                </CardContent>
              </CardPaper>
              <CardPaper>
                <CardContent>
                  <TextInputFlat
                    label={'Message'}
                    onChangeText={handleChange('message')}
                    value={values.message}
                    errorMessage={errors.message}
                  />
                </CardContent>
              </CardPaper>
              <ButtonPaper onPress={handleSubmit} disabled={!isValid}>
                Transfer
              </ButtonPaper>
            </View>
          </ScrollView>
        )}
      </Formik>
    </Background>
  );
};

export default Transaction;
