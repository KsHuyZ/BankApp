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

type ShowPasswordState = {
  oldPassword: boolean;
  newPassword: boolean;
  retryPassword: boolean;
};

const Profile = ({navigation}: any) => {
  const {profile} = useAuth();
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    retryPassword: false,
  });
  const [changePassword, setChangePassword] = useState<boolean>(false);

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
              <Button mode="text" textColor="black">
                Update
              </Button>
            </View>
          </CardContent>
          <CardContent>
            <View style={styles.profileSection}>
              <Text style={styles.profileTitle}>First Name</Text>
              <Text>{profile.firstName}</Text>
            </View>
            <View style={styles.profileSection}>
              <Text style={styles.profileTitle}>Last Name</Text>
              <Text>{profile.lastName}</Text>
            </View>
            <View style={styles.profileSection}>
              <Text style={styles.profileTitle}>Phone Number</Text>
              <Text>{profile.phoneNumber}</Text>
            </View>
          </CardContent>
        </CardPaper>
        {changePassword ? (
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
                <TextInputFlat
                  secureTextEntry={showPassword.oldPassword}
                  right={
                    <TextInput.Icon
                      icon={`eye${!showPassword.oldPassword ? '-off' : ''}`}
                      onPress={() => handleShowPassword('oldPassword')}
                    />
                  }
                />
              </View>
              <View style={styles.profileSection}>
                <Text style={styles.profileTitle}>New Password</Text>
                <TextInputFlat
                  secureTextEntry={showPassword.newPassword}
                  right={
                    <TextInput.Icon
                      icon={`eye${!showPassword.newPassword ? '-off' : ''}`}
                      onPress={() => handleShowPassword('newPassword')}
                    />
                  }
                />
              </View>
              <View style={styles.profileSection}>
                <Text style={styles.profileTitle}>Retype New Password</Text>
                <TextInputFlat
                  secureTextEntry={showPassword.retryPassword}
                  right={
                    <TextInput.Icon
                      icon={`eye${!showPassword.retryPassword ? '-off' : ''}`}
                      onPress={() => handleShowPassword('retryPassword')}
                    />
                  }
                />
              </View>
            </CardContent>
            <CardContent>
              <Button mode="contained" buttonColor="black">
                Update
              </Button>
            </CardContent>
          </CardPaper>
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
