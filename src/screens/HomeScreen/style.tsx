import { StyleSheet } from 'react-native';
import { normalizeHeight, pixelSizeY } from '../../theme/size';

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: 150,
  },
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  btnCont: {
    height: normalizeHeight(120), 
    width: '49%', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: pixelSizeY(20),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
