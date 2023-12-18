import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useAppDispatch } from '../../store/hooks';
import { saveAccessToken } from '../../store/features/user/userSlice';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootAuthLayout() {
  const dispatch = useAppDispatch();
  const { user, isLoading, getCredentials } = useAuth0();
  const loggedIn = user !== undefined && user !== null;

  useEffect(() => {
    const saveToken = async () => {
      const { accessToken } = await getCredentials();
      dispatch(saveAccessToken(accessToken));
    }
    if (loggedIn) {
      saveToken();
    }
  }, [loggedIn]);
  
  if (isLoading) {
    return null;
  }

  if (!loggedIn) {
    return <Redirect href="/login" />
  }

  return (
    <RootLayoutNav />
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
