import { Image } from "react-native";

export const MAIN_COLOR = '#131313';
export const INPUT_COLOR = '#212121';
export const TEXT_COLOR = '#fff';
export const PRIMARY_COLOR = '#2A86FF';
export const SCREEN_PADDING = 20;

export const Logo = () => (
  <Image
    style={{ height: 40, width: 40, marginBottom: SCREEN_PADDING }}
    source={require('../assets/logo.webp')}
  />
);
