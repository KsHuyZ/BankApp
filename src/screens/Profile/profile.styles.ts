import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  accountSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 30,
    marginRight: 20,
  },
  copyIcon: {
    fontSize: 20,
    marginLeft: 20,
  },
  updateSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profileSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
    width: '100%',
  },
  inputSection: {
    width: '100%',
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
});
export default styles;
