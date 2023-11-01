import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  contain: {
    padding: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    margin: 2,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  Time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  optionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptySection: {
    padding: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
