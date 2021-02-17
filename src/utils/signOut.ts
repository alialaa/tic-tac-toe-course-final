import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Auth, API, graphqlOperation } from "aws-amplify";
import gql from "graphql-tag";

const signOut = async (): Promise<void> => {
    if (Constants.isDevice) {
        const tokenRes = await Notifications.getExpoPushTokenAsync();
        const deleteExpoToken = gql`
            mutation deleteExpoToken($token: String!) {
                deleteExpoToken(input: { token: $token }) {
                    token
                }
            }
        `;
        await API.graphql(
            graphqlOperation(deleteExpoToken, {
                token: tokenRes.data
            })
        );
    }
    await Auth.signOut();
};

export default signOut;
