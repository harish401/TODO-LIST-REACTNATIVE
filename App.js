import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Completed from "./screens/Completed";
import Pending from "./screens/Pending";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { Store } from "./screens/redux/store";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      backBehavior={"history"}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#07b6ff",
        tabBarInactiveTintColor: "black",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Completed") {
            iconName = "md-checkmark-circle-sharp";
          } else if (route.name === "Pending") {
            iconName = "md-trash-bin-sharp";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Pending"
        component={Pending}
        options={{
          headerShown: false,
          backBehavior: "history",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{
          headerShown: false,
          backBehavior: "history",
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}
const RootStack = createStackNavigator();
function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#0080ff",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
            },
          }}
        >
          <RootStack.Screen
            name="My Tasks"
            options={{ headerShown: false }}
            component={MyTabs}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
