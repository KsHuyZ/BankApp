import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Background from '../../components/Background';
import styles from '../Login/components/EmailValidate/validate.styles';
import TextInputPaper from '../../components/TextInputPaper';
import ButtonPaper from '../../components/ButtonPaper';
import authApi from '../../api/authApi';
import {SCREEN} from '../../constants';
import {TextInput} from 'react-native-paper';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {saveStorage} from '../../utils';
import {storageKey} from '../../constants';
import {useAuth} from '../../hooks';
import httpClient from '../../libs/axios';

const {Home} = SCREEN;
const {profileKey, refreshTokenKey} = storageKey;
const schema = Yup.object().shape({
  firstName: Yup.string().required('Please enter first name'),
  lastName: Yup.string().required('Please enter last name'),
  phoneNumber: Yup.number().required('Please enter phone number'),
  password: Yup.string().required('Please enter password'),
  rePassword: Yup.string()
    .required('Please enter retype password')
    .oneOf([Yup.ref('password')], 'Password must match'),
});

interface ShowPasswordState {
  password: boolean;
  rePassword: boolean;
}

const Register = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    password: false,
    rePassword: false,
  });

  const {saveProfile} = useAuth();
  const handleSubmitForm = async ({
    firstName,
    lastName,
    password,
    phoneNumber,
    rePassword,
  }: RegisterFormType) => {
    const {register} = authApi;
    setLoading(true);
    const result = await register({
      firstName,
      lastName,
      password,
      phoneNumber,
      rePassword,
    });
    if (result.success) {
      saveProfile(result.user);
      return navigation.navigate(Home);
    }
    setLoading(false);
  };

  const handleShowPassword = (field: keyof ShowPasswordState) => {
    setShowPassword(prevShowPassword => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  return (
    <Background>
      <KeyboardAvoidingWrapper>
        <View style={styles.headSection}>
          <Text style={styles.textHead}>Enter Phone Number</Text>
          <View>
            <Text style={styles.text}>
              Use email to register or log in in BankApp
            </Text>
          </View>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              password: '',
              rePassword: '',
            }}
            validationSchema={schema}
            onSubmit={handleSubmitForm}>
            {({values, errors, handleSubmit, handleChange, isValid}) => (
              <View style={styles.container}>
                <TextInputPaper
                  placeholder="First Name"
                  disabled={loading}
                  value={values.firstName}
                  errorMessage={errors.firstName}
                  onChangeText={handleChange('firstName')}
                />
                <TextInputPaper
                  placeholder="Last Name"
                  disabled={loading}
                  value={values.lastName}
                  errorMessage={errors.lastName}
                  onChangeText={handleChange('lastName')}
                />
                <TextInputPaper
                  placeholder="Phone Number"
                  disabled={loading}
                  value={values.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                />
                <TextInputPaper
                  placeholder="Password"
                  secureTextEntry={showPassword.password}
                  disabled={loading}
                  value={values.password}
                  errorMessage={errors.password}
                  onChangeText={handleChange('password')}
                  right={
                    <TextInput.Icon
                      icon={`eye${showPassword.password ? '-off' : ''}`}
                      onPress={() => handleShowPassword('password')}
                    />
                  }
                />
                <TextInputPaper
                  placeholder="Retype Password"
                  secureTextEntry={showPassword.rePassword}
                  disabled={loading}
                  value={values.rePassword}
                  errorMessage={errors.rePassword}
                  onChangeText={handleChange('rePassword')}
                  right={
                    <TextInput.Icon
                      icon={`eye${showPassword.rePassword ? '-off' : ''}`}
                      onPress={() => handleShowPassword('rePassword')}
                    />
                  }
                />
                <View style={styles.buttonCheck}>
                  <ButtonPaper
                    onPress={handleSubmit}
                    disabled={!isValid || loading}>
                    Continue
                  </ButtonPaper>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingWrapper>
    </Background>
  );
};

export default Register;
