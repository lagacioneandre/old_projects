import React from 'react';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import Routes from './src/routes';

export default function App() {
  const [fontsLoades] = useFonts({
    n6: Nunito_600SemiBold,
    n7: Nunito_700Bold,
    n8: Nunito_800ExtraBold,
  });

  if (!fontsLoades) {
    return null;
  }

  return (
    <Routes />
  );
}
