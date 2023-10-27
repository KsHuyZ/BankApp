import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import styles from '../Profile/Profile.styles';

const Profile = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.row}>
          <Text style={{ color: "green"} } >First Name:  </Text> 
          <Text>Tien Huy </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: "green"} }>Last Name:</Text>
          <Text>Phan</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: "green"} }>Phone Number:</Text>
          <Text>01234567</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: "green"} } >Email:</Text>
          <Text>phantienhuy@gmail.com</Text>
        </View>
        <Button title="Edit Profile" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
