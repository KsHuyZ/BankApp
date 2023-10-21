import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
  },
  header: {
    flexDirection: 'column',
    height: 50,
    justifyContent: 'space-between',
  },
  titleHeader: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  textHeader: {
    color: '#fff',
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 20,
  },
  otpField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpText: {
    color: '#fff',
  },
  timeExpired: {
    color: '#fff',
  },
  input: {
    flexDirection: 'column',
  },
  errorInput: {
    textAlign: 'center',
  },
});
export default styles;
