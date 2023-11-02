import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import ButtonPaper from '../../../../components/ButtonPaper';
import BackgroundImage from '../../../../components/BackgroundImage';
import styles from './validate.styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputPaper from '../../../../components/TextInputPaper';
import {SCREEN, storageKey} from '../../../../constants';
import authApi from '../../../../api/authApi';
import {saveStorage} from '../../../../utils';

const {OTP, Register, Login} = SCREEN;

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter valid email format'),
});
const {profileKey, emailKey} = storageKey;
const EmailValidate = ({navigation}: any) => {
  const [checking, setChecking] = useState<boolean>(false);

  const handleCheckingEmail = async ({email}: {email: string}) => {
    const {checkUser} = authApi;
    setChecking(true);
    const result = await checkUser(email);
    if (result.success) {
      if (!result.isVerified) {
        await saveStorage(emailKey, email);
        return navigation.replace(OTP);
      }
      if (!result.password) {
        await saveStorage(emailKey, email);
        return navigation.navigate(Register);
      }
      const userProfile = JSON.stringify(result.user);
      await saveStorage(profileKey, userProfile);
      return navigation.navigate(Login);
    }
  };

  return (
    <BackgroundImage>
      <View style={styles.headSection}>
        <Text style={styles.textHead}>Enter Phone Number</Text>
        <View>
          <Text style={styles.text}>
            Use email to register or log in in Financial
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={emailSchema}
        onSubmit={handleCheckingEmail}>
        {({values, errors, handleSubmit, handleChange, isValid}) => (
          <View style={styles.container}>
            <TextInputPaper
              placeholder="Email"
              disabled={checking}
              value={values.email}
              errorMessage={errors.email}
              onChangeText={handleChange('email')}
              left={<TextInput.Icon icon="email" color="#fff" />}
            />
            <View style={styles.buttonCheck}>
              <ButtonPaper
                loading={checking}
                onPress={handleSubmit}
                disabled={!isValid || checking}>
                Continue
              </ButtonPaper>
            </View>
          </View>
        )}
      </Formik>
    </BackgroundImage>
  );
};

export default EmailValidate;
