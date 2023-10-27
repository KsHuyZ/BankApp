import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  successIcon: {
    fontSize: 80,
    color: 'green',
    textAlign: 'center',
  },
  titleSection: {
    flexDirection: 'column',
  },
  contain: {
    padding: 12,
  },
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  amountTransfer: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  transferSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    paddingHorizontal: 30,
  },
  cancelBtnText: {
    color: 'black',
    fontWeight: 'bold',
  },
  newTrasBtn: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 15,
    paddingHorizontal: 30,
  },
  newTransText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default styles;
