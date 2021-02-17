import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

const addExpoToken = gql`
    mutation addExpoToken($token: String!) {
        addExpoToken(token: $token) {
            playerUsername
            token
        }
    }
`;

const initNotifications = async (): Promise<void> => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            return;
        }

        const tokenRes = await Notifications.getExpoPushTokenAsync();
        try {
            await API.graphql(
                graphqlOperation(addExpoToken, {
                    token: tokenRes.data
                })
            );
        } catch (error) {
            console.log(error);
            //report
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX
            });
        }
    }
};

export default initNotifications;
