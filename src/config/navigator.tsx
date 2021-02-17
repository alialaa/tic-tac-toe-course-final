import React, { ReactElement, useState, useEffect, useRef } from "react";
import {
    NavigationContainer,
    NavigationContainerRef,
    StackActions
} from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import {
    Home,
    SinglePlayerGame,
    Settings,
    Login,
    SignUp,
    ChangePassword,
    ForgotPassword,
    MultiplayerHome,
    MultiplayerGame
} from "@screens";
import { colors } from "@utils";
import { useAuth } from "@contexts/auth-context";
import * as Notifications from "expo-notifications";

export type StackNavigatorParams = {
    Home: undefined;
    SinglePlayerGame: undefined;
    Settings: undefined;
    Login: { redirect: keyof StackNavigatorParams } | undefined;
    SignUp: { username: string } | undefined;
    ChangePassword: undefined;
    ForgotPassword: undefined;
    MultiplayerHome: undefined;
    MultiplayerGame:
        | { gameID: string; invitee?: undefined }
        | { invitee: string; gameID?: undefined };
};

const Stack = createStackNavigator<StackNavigatorParams>();

const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    headerTintColor: colors.lightGreen,
    headerTitleStyle: {
        fontFamily: "DeliusUnicase_700Bold",
        fontSize: 20
    },
    headerBackTitleStyle: {
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 14
    }
};

export default function Navigator(): ReactElement {
    const { user } = useAuth();
    const navigatorRef = useRef<NavigationContainerRef | null>(null);
    const [isNavigatorReady, setIsNavigatorReady] = useState(false);

    useEffect(() => {
        if (user && isNavigatorReady) {
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                const gameID = response.notification.request.content.data.gameId;

                if (navigatorRef.current?.getCurrentRoute()?.name === "MultiplayerGame") {
                    navigatorRef.current.dispatch(
                        StackActions.replace("MultiplayerGame", {
                            gameID
                        })
                    );
                } else {
                    navigatorRef.current?.navigate("MultiplayerGame", {
                        gameID
                    });
                }
            });

            return () => {
                subscription.remove();
            };
        }
    }, [user, isNavigatorReady]);

    return (
        <NavigationContainer
            ref={navigatorRef}
            onReady={() => {
                setIsNavigatorReady(true);
            }}
        >
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen
                    name="SinglePlayerGame"
                    component={SinglePlayerGame}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign-Up" }} />
                <Stack.Screen
                    name="ChangePassword"
                    options={{ title: "Change Password" }}
                    component={ChangePassword}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    options={{ title: "Forgot Password" }}
                    component={ForgotPassword}
                />
                <Stack.Screen
                    name="MultiplayerHome"
                    component={MultiplayerHome}
                    options={{ title: "Multiplayer" }}
                />
                <Stack.Screen
                    name="MultiplayerGame"
                    component={MultiplayerGame}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
