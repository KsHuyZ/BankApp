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
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  tit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 30,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noti: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
});
export default styles;
