import {StyleSheet} from 'react-native';

export interface IStyle {
  container: any;
  title: any;
  iconContainer: any;
}

export const styles = StyleSheet.create<IStyle>({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconContainer: (bgColor: string, tintColor: string, boxType: string) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: boxType === 'square' ? 3 : 100,
    borderColor: tintColor,
    height: 20,
    width: 20,
    backgroundColor: bgColor,
    borderWidth: 1,
  }),

  title: {
    fontSize: 16,
  },
});
