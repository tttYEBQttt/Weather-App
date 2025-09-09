import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CLIMA from './CLIMA'; // Import main Weather component
import { useFonts as useRobotoFonts, RobotoCondensed_500Medium } from '@expo-google-fonts/roboto-condensed';
import { useFonts as useKanitFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { useFonts as useAsimovianFonts, Asimovian_400Regular } from '@expo-google-fonts/asimovian';

export default function App() {
  // Load Roboto Condensed font
  const [robotoLoaded] = useRobotoFonts({
    RobotoCondensed_500Medium,
  });

  // Load Kanit font
  const [kanitLoaded] = useKanitFonts({
    Kanit_500Medium,
  });

  // Load Asimovian font
  const [asimovianLoaded] = useAsimovianFonts({
    Asimovian_400Regular,
  });

  // If fonts are not loaded yet, don't render the app
  if (!robotoLoaded || !kanitLoaded || !asimovianLoaded) {
    return null;
  }

  // Render main weather app component
  return (
    <CLIMA />
  );
}

// Default styles (not currently used in rendering)
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the whole screen
    backgroundColor: '#fff',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
});
