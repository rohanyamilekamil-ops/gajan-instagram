import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import BuyerScreen from './BuyerScreen';
import WithdrawScreen from './WithdrawScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#000' } }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Store" component={BuyerScreen} />
      <Tab.Screen name="Withdraw" component={WithdrawScreen} />
      <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
