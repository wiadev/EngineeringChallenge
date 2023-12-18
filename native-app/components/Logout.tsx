import { Button } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import { useAppDispatch } from '../store/hooks';
import { clearAccessToken } from '../store/features/user/userSlice';

export function Logout() {
  const dispatch = useAppDispatch();
  const { clearSession } = useAuth0();
  const handleLogout = async () => {
    try {
      await clearSession();
      dispatch(clearAccessToken());
      router.replace('/login');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button title="Log out" onPress={handleLogout} />
  )
}