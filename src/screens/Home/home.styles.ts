import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    paddingVertical: 14,
  },
  notiIcon: {
    position: 'relative',
  },
  numUnseen: {
    position: 'absolute',
    top: -1,
    left: -5,
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 30,
    fontSize: 10,
    backgroundColor: 'red',
    color: '#fff',
  },
});

export default styles;
