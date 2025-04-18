import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import { Icon } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lesson from "./components/Home/Lesson";
import Register from "./components/User/Register"

//Tạo stack lồng trong tab navigator
const Stack=createNativeStackNavigator();
const StackNavigator=() => {
    return (
        <Stack.Navigator>
            <Tab.Screen name="Home" component={Home} options={{title:'Khóa học'}}/>
            <Tab.Screen name="Lesson" component={Lesson} options={{title:'Bài học'}}/>
        </Stack.Navigator>
    )
}


const Tab= createBottomTabNavigator();
const TabNavigator=() => {
    return (
        <Tab.Navigator screenOptions={{headerShown:true}}>
           <Tab.Screen 
              name="home" 
              component={StackNavigator} 
              options={{
                  tabBarIcon: () => <Icon source="home" size={24} />
              }}/>
           <Tab.Screen 
              name="Login" 
              component={Login} 
              options={{
                  title: "Đăng nhập",
                  tabBarIcon: () => <Icon source="account" size={24} />
              }}/>
           <Tab.Screen 
              name="register" 
              component={Register} 
              options={{
                  title: "Đăng ký",
                  tabBarIcon: () => <Icon source="account" size={24} />
              }}/>
        </Tab.Navigator>
    )
}


const App= () => {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}

export default App;