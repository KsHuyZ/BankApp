import {View, Text, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome6';
import IconIO from 'react-native-vector-icons/Ionicons';
import Background from '../../components/Background';
import CardPaper, {CardContent} from '../../components/CardPaper';
import styles from './profile.styles';
import {useAuth} from '../../hooks';
import {Button, TextInput} from 'react-native-paper';
import {TextInputFlat} from '../../components/TextInputPaper';
import ButtonPaper from '../../components/ButtonPaper';
import * as Yup from 'yup';
import {Formik} from 'formik';
import userApi from '../../api/userApi';

const {updateProfile: updateProfileApi, changePassword: changePasswordApi} =
  userApi;

type ShowPasswordState = {
  oldPassword: boolean;
  newPassword: boolean;
  retryPassword: boolean;
};

type profileType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type PasswordFormType = {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
};

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter first name'),
  lastName: Yup.string().required('Please enter last name'),
  phoneNumber: Yup.number().required('Please enter phone number'),
});

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please enter old password'),
  newPassword: Yup.string().required('Please enter new password'),
  retypePassword: Yup.string()
    .required('Please enter retype password')
    .oneOf([Yup.ref('newPassword')], 'Password must match'),
});

const Profile = ({navigation}: any) => {
  const {profile, updateProfile: updateGlobalProfile} = useAuth();
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    retryPassword: false,
  });
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  const handleShowPassword = (field: keyof ShowPasswordState) => {
    setShowPassword(prevShowPassword => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  const handleCopyCardNumber = () => {
    Clipboard.setString(profile.cardNumber.toString());
    Alert.alert('Copy to clipboard');
  };

  const handleUpdateProfile = async (values: profileType) => {
    const {firstName, lastName, phoneNumber} = values;
    const result = await updateProfileApi(
      profile._id,
      firstName,
      lastName,
      phoneNumber,
    );
    if (result.success) {
      Alert.alert('Update success');
      updateGlobalProfile({...profile, firstName, lastName, phoneNumber});
      setUpdateProfile(false);
    }
  };

  const handleChangePassword = async (
    values: PasswordFormType,
    {setErrors}: any,
  ) => {
    const {newPassword, oldPassword, retypePassword} = values;
    const result = await changePasswordApi(
      profile._id,
      oldPassword,
      newPassword,
      retypePassword,
    );
    if (result.success) {
      Alert.alert('Update success');
      setChangePassword(false);
      return;
    }
    if (result.message === 'wrong_password') {
      setErrors({oldPassword: 'Wrong Password'});
    }
  };

  return (
    <Background title="Profile" goBack={() => navigation.goBack()}>
      <ScrollView>
        <CardPaper>
          <CardContent>
            <View style={styles.accountSection}>
              <Icon style={styles.icon} name="wallet" />
              <Text style={styles.accountTitle}>Account</Text>
            </View>
          </CardContent>
          <CardContent>
            <View style={styles.accountSection}>
              <Text>{profile.cardNumber}</Text>
              <IconIO
                name="copy-outline"
                style={styles.copyIcon}
                onPress={handleCopyCardNumber}
              />
            </View>
            <Text>
              Balance: {new Intl.NumberFormat().format(profile.balance)} USD
            </Text>
          </CardContent>
        </CardPaper>
        <CardPaper>
          <CardContent>
            <View style={styles.updateSection}>
              <Button
                mode="text"
                textColor="black"
                onPress={() => setUpdateProfile(prev => !prev)}>
                {updateProfile ? 'Cancel' : 'Update'}
              </Button>
            </View>
          </CardContent>
          <Formik
            initialValues={{
              firstName: profile.firstName,
              lastName: profile.lastName,
              phoneNumber: profile.phoneNumber,
            }}
            validationSchema={profileSchema}
            onSubmit={handleUpdateProfile}>
            {({values, errors, handleSubmit, handleChange, isValid}) => (
              <CardContent>
                <View style={styles.profileSection}>
                  <Text style={styles.profileTitle}>First Name</Text>
                  <View style={styles.inputSection}>
                    {updateProfile ? (
                      <TextInputFlat
                        value={values.firstName}
                        errorMessage={errors.firstName}
                        onChangeText={handleChange('firstName')}
                      />
                    ) : (
                      <Text>{profile.firstName}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.profileSection}>
                  <Text style={styles.profileTitle}>Last Name</Text>
                  <View style={styles.inputSection}>
                    {updateProfile ? (
                      <TextInputFlat
                        value={values.lastName}
                        errorMessage={errors.lastName}
                        onChangeText={handleChange('lastName')}
                      />
                    ) : (
                      <Text>{profile.lastName}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.profileSection}>
                  <Text style={styles.profileTitle}>Phone Number</Text>
                  <View style={styles.inputSection}>
                    {updateProfile ? (
                      <TextInputFlat
                        value={values.phoneNumber}
                        errorMessage={errors.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                      />
                    ) : (
                      <Text>{profile.phoneNumber}</Text>
                    )}
                  </View>
                </View>
                {updateProfile ? (
                  <Button
                    mode="contained"
                    buttonColor="black"
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    Update
                  </Button>
                ) : (
                  <></>
                )}
              </CardContent>
            )}
          </Formik>
        </CardPaper>
        {changePassword ? (
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              retypePassword: '',
            }}
            validationSchema={passwordSchema}
            onSubmit={handleChangePassword}>
            {({values, errors, handleSubmit, handleChange, isValid}) => (
              <CardPaper>
                <CardContent>
                  <View style={styles.updateSection}>
                    <Button
                      mode="text"
                      textColor="black"
                      onPress={() => setChangePassword(false)}>
                      Cancel
                    </Button>
                  </View>
                </CardContent>
                <CardContent>
                  <View style={styles.profileSection}>
                    <Text style={styles.profileTitle}>Old Password</Text>
                    <View style={styles.inputSection}>
                      <TextInputFlat
                        secureTextEntry={!showPassword.oldPassword}
                        value={values.oldPassword}
                        errorMessage={errors.oldPassword}
                        onChangeText={handleChange('oldPassword')}
                        right={
                          <TextInput.Icon
                            icon={`eye${
                              !showPassword.oldPassword ? '-off' : ''
                            }`}
                            onPress={() => handleShowPassword('oldPassword')}
                          />
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.profileSection}>
                    <Text style={styles.profileTitle}>New Password</Text>
                    <View style={styles.inputSection}>
                      <TextInputFlat
                        secureTextEntry={!showPassword.newPassword}
                        value={values.newPassword}
                        errorMessage={errors.newPassword}
                        onChangeText={handleChange('newPassword')}
                        right={
                          <TextInput.Icon
                            icon={`eye${
                              !showPassword.newPassword ? '-off' : ''
                            }`}
                            onPress={() => handleShowPassword('newPassword')}
                          />
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.profileSection}>
                    <Text style={styles.profileTitle}>Retype New Password</Text>
                    <View style={styles.inputSection}>
                      <TextInputFlat
                        secureTextEntry={!showPassword.retryPassword}
                        value={values.retypePassword}
                        onChangeText={handleChange('retypePassword')}
                        errorMessage={errors.retypePassword}
                        right={
                          <TextInput.Icon
                            icon={`eye${
                              !showPassword.retryPassword ? '-off' : ''
                            }`}
                            onPress={() => handleShowPassword('retryPassword')}
                          />
                        }
                      />
                    </View>
                  </View>
                </CardContent>
                <CardContent>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    buttonColor="black"
                    disabled={!isValid}>
                    Update
                  </Button>
                </CardContent>
              </CardPaper>
            )}
          </Formik>
        ) : (
          <ButtonPaper onPress={() => setChangePassword(true)}>
            Change Password
          </ButtonPaper>
        )}
      </ScrollView>
    </Background>
  );
};

export default Profile;
