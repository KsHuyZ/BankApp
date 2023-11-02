import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitle: {
    fontWeight: 'bold',
    color: '#333',
    width: '40%',
  },
  detailText: {
    color: '#555',
  },
  successLabel: {
    textAlign: 'left',
    color: 'green',
    backgroundColor: '#00800063',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 10,
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  bankIcon: {
    fontSize: 60,
  },
});
export default styles;
