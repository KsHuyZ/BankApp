import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from '../../components/Background';
import styles from './components/EmailValidate/validate.styles';
import {getStorage, saveStorage} from '../../utils';
import {storageKey, SCREEN} from '../../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputPaper from '../../components/TextInputPaper';
import {TextInput} from 'react-native-paper';
import ButtonPaper from '../../components/ButtonPaper';
import authApi from '../../api/authApi';
import {useAuth} from '../../hooks';
import httpClient from '../../libs/axios';

const {profileKey} = storageKey;
const {Validate, Home} = SCREEN;
const {signIn} = authApi;

const schema = Yup.object().shape({
  password: Yup.string().required('Please enter password'),
});

const Login = ({navigation, route}: any) => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const goBack = route.params?.goBack;
  const {saveProfile} = useAuth();

  const handleGetProfile = async () => {
    const profileString = await getStorage(profileKey);
    if (profileString) {
      const profileJSON: ProfileType = JSON.parse(profileString);
      setProfile(profileJSON);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleSignIn = async ({password}: {password: string}) => {
    setLoading(true);
    const result = await signIn(password);
    if (result.success) {
      saveProfile(result.user);
      await saveStorage(profileKey, JSON.stringify(result.user));
      return navigation.navigate(Home);
    }
    if (result.message === 'wrong_password') {
      setError('Wrong Password');
    }
    if (result.message === 'not_exist') {
      setError('Email not register');
    }
    setLoading(false);
  };

  return (
    <Background
      goBack={() =>
        goBack ? navigation.goBack() : navigation.navigate(Validate)
      }>
      <View>
        <View style={styles.headSection}>
          <Text style={styles.textHead}>Sign In</Text>
          <View>
            <Text style={styles.text}>
              Hello, {profile?.firstName} {profile?.lastName}
            </Text>
            <Text style={styles.text}>{profile?.email}</Text>
          </View>
        </View>
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={schema}
          onSubmit={handleSignIn}>
          {({values, errors, handleSubmit, handleChange, isValid}) => (
            <View style={styles.container}>
              <TextInputPaper
                placeholder="Password"
                // disabled={checking}
                value={values.password}
                errorMessage={errors.password || error}
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                left={<TextInput.Icon icon="lock" color="#fff" />}
                right={
                  <TextInput.Icon
                    icon={`eye${!showPassword ? '-off' : ''}`}
                    color="#fff"
                    onPress={() => setShowPassword(prev => !prev)}
                  />
                }
              />
              <View style={styles.buttonCheck}>
                <ButtonPaper
                  loading={loading}
                  onPress={handleSubmit}
                  disabled={!isValid || loading}>
                  Continue
                </ButtonPaper>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Background>
  );
};

export default Login;
