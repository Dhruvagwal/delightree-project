import { StyleSheet } from 'react-native';
import {
  INPUT_COLOR,
  MAIN_COLOR,
  PRIMARY_COLOR,
  SCREEN_PADDING,
  TEXT_COLOR,
} from '../../styles/global';

export const form_styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 30,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  subTitle: {
    color: TEXT_COLOR,
    opacity: 0.7,
    marginBottom: SCREEN_PADDING ,
  },
  input: {
    padding: SCREEN_PADDING,
    borderRadius: 5,
    backgroundColor: INPUT_COLOR,
    marginBottom: SCREEN_PADDING*0.5,
    color: TEXT_COLOR,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: SCREEN_PADDING * 0.5,
    borderRadius: 5,
  },
  buttonText: {
    color: TEXT_COLOR,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  error: { color: 'red', marginBottom: 8, fontSize: 12 },
  success: { color: 'green', marginBottom: 8, fontSize: 12 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: 'blue', textDecorationLine: 'underline' },
});
