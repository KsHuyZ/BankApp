import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textTitle: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textDesc: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 30,
  },
  wrapText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 100,
    marginTop: 40,
  },
  wrapper: {},
  cardImg1: {
    position: 'absolute',
    zIndex: 2,
    bottom: 30,
  },
  button: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
export default styles;
