import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  otpContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  input: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  otpInputText: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  otpInput: {
    borderColor: '#ffffff33',
    minWidth: '15%',
    borderWidth: 2,
    borderRadius: 5,
    padding: 12,
  },
  otpInputFocus: {
    borderColor: '#fff',
    backgroundColor: '#ffffff33',
  },
});
export default styles;
