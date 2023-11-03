import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 15,
    margin: 1,
    borderRadius: 10,
    fontSize: 2,
  },

  container: {
    marginVertical: 20,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 30,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noti: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  titleTransfer: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unseen: {
    marginLeft: 10,
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
});
export default styles;
