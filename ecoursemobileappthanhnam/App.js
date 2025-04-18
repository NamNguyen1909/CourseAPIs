import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import { Icon } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lesson from "./components/Home/Lesson";
import Register from "./components/User/Register"
import Profile from "./components/User/Profile";
import MyUserReducer from "./reducers/MyUserReducer";
import { useContext, useReducer } from "react";
import { MyDispatchContext, MyUserContext } from "./configs/MyContexts";
import LessonDetails from "./components/Home/LessonDetails";

//Tạo stack lồng trong tab navigator
const Stack=createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{ title: 'Khóa học' }} />
            <Stack.Screen name="lesson" component={Lesson} options={{ title: 'Bài học' }} />
            <Stack.Screen name="lesson-details" component={LessonDetails} options={{ title: 'Chi tiết bài học' }} />
        </Stack.Navigator>
    );
};


const Tab= createBottomTabNavigator();
const TabNavigator = () => {
    const user = useContext(MyUserContext);
  
    return (
      <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Screen name="home" component={StackNavigator} options={{ title: "Khóa học", tabBarIcon: () => <Icon size={30} source="home" />}} />
  
        {user === null?<>
          <Tab.Screen name="login" component={Login} options={{title: 'Đăng nhập', tabBarIcon: () => <Icon size={30} source="account" />}} />
          <Tab.Screen name="register" component={Register} options={{title: 'Đăng ký', tabBarIcon: () => <Icon size={30} source="account-plus" />}} />
          
        </>:<>
          <Tab.Screen name="profile" component={Profile} options={{title: 'Tài khoản', tabBarIcon: () => <Icon size={30} source="account" />}} />
        </>}
  
        
      </Tab.Navigator>
    )
  }


const App= () => {

    const [user,dispatch]= useReducer(MyUserReducer,null);
    return (
        <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
            <NavigationContainer>
            <TabNavigator />
            </NavigationContainer>
        </MyDispatchContext.Provider>
        </MyUserContext.Provider>
      );
}

export default App;