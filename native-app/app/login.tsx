import {StyleSheet, Button} from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import { View } from '../components/Themed';
import { useAppDispatch } from '../store/hooks';
import { saveAccessToken } from '../store/features/user/userSlice';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { authorize, getCredentials } = useAuth0();
  const handleLogin = async () => {
    try {
      await authorize({
        audience: 'https://dev-508w33yg5pe4k7ak.us.auth0.com/api/v2/',
      });
      const { accessToken } = await getCredentials();
      dispatch(saveAccessToken(accessToken));
      router.replace('/(tabs)');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});