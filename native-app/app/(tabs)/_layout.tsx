import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs, Redirect} from 'expo-router';
import {Pressable, useColorScheme} from 'react-native';
import { useEffect } from 'react';
import Colors from '../../constants/Colors';
import { Logout } from '../../components/Logout';
import { useAuth0 } from 'react-native-auth0';
import { useAppDispatch } from '../../store/hooks';
import { saveAccessToken } from '../../store/features/user/userSlice';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Machine State',
          tabBarIcon: ({color}) => <TabBarIcon name='list-ul' color={color} />,
          headerRight: () => <Logout />
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Log Part',
          tabBarIcon: ({color}) => <TabBarIcon name='edit' color={color} />,
          headerRight: () => <Logout />
        }}
      />
    </Tabs>
  );
}
