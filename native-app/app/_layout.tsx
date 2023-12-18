import { Slot, SplashScreen } from 'expo-router';
import { Auth0Provider } from 'react-native-auth0';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { store } from '../store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Set up the auth context and render our layout inside of it.
  return (
    <Provider store={store}>
      <Auth0Provider
        domain={"dev-508w33yg5pe4k7ak.us.auth0.com"}
        clientId={"1ev3Q0NVqsLi49OdbsGv9O49i7e99LjK"}
      >
        <Slot />
      </Auth0Provider>
    </Provider>
  );
}