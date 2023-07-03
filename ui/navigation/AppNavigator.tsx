import HomeScreen from '../appScreens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../appScreens/ProfileScreen';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import WelcomeScreen from '../appScreens/WelcomeScreen';
import { ExpensesProvider } from '../../providers/ExpensesProvider';

export interface Navigation {
  navigation: {
    setOptions: (options: {title: string}) => void
  }
}

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  const {isLoggedIn} = useContext(UserContext)

  if (!isLoggedIn) { 
    return (
      <WelcomeScreen /> 
    )
  }

  return (
    <ExpensesProvider>
      <Tab.Navigator screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 15
        },
        tabBarIconStyle: { display: "none" },
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Home'}} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </ExpensesProvider>
  )
}
export default MainTabNavigator