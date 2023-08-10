import * as React from "react";
import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import StartingScreen from "./src/screen/StartingScreen/StartingScreen";
import HomeScreen from "./src/screen/Home/Home";
import Profile from "./src/screen/Profiles/Profile";
import { useCallback, useEffect, useRef, useState } from "react";
import { store } from "./src/store";
import { Provider } from "react-redux";
import VisitProfile from "./src/screen/Profiles/VisitProfile";
import EditProfile from "./src/screen/Profiles/EditProfile";
import Connections from "./src/screen/Connections/Connections";
import SetupProfile from "./src/screen/Profiles/SetupProfile";
import Toast from "react-native-toast-message";
import ChatScreen from "./src/screen/ChatScreen/ChatScreen";
import CheckCodes from "./src/screen/CheckCodes/CheckCodes";
import DiscoverySettings from "./src/screen/DiscoverySettings/DiscoverySettings";
import { registerForPushNotificationsAsync } from "./src/utils/helpers";

SplashScreen.preventAutoHideAsync();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "#161616",
  },
};

const Stack = createNativeStackNavigator();

function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("'addNotficationResponseReceive", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [fontsLoaded] = useFonts({
    bebas: require("./src/assets/fonts/BebasNeue-Regular.ttf"),
    roboto: require("./src/assets/fonts/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AutocompleteDropdownContextProvider>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="CheckCodes"
                component={CheckCodes}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Start"
                component={StartingScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VisitProfile"
                component={VisitProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Connections"
                component={Connections}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SetupProfile"
                component={SetupProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DiscoverySettings"
                component={DiscoverySettings}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AutocompleteDropdownContextProvider>
        <Toast />
      </View>
    </Provider>
  );
}

export default App;
