/* Amplify Params - DO NOT EDIT
	API_TICTACTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_TICTACTOE_GRAPHQLAPIIDOUTPUT
	API_TICTACTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");

const getExpoToken = gql`
    query getExpoToken($token: String!) {
        getExpoToken(token: $token) {
            id
            token
            playerUsername
        }
    }
`;
const createExpoToken = gql`
    mutation createExpoToken($token: String!, $playerUsername: String!) {
        createExpoToken(input: { token: $token, playerUsername: $playerUsername }) {
            id
            token
            playerUsername
        }
    }
`;
const updateExpoToken = gql`
    mutation updateExpoToken($id: ID!, $token: String!, $playerUsername: String!) {
        updateExpoToken(input: { id: $id, token: $token, playerUsername: $playerUsername }) {
            id
            token
            playerUsername
        }
    }
`;

exports.handler = async event => {
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: process.env.API_TICTACTOE_GRAPHQLAPIENDPOINTOUTPUT,
        region: process.env.REGION,
        auth: {
            type: "AWS_IAM",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                sessionToken: process.env.AWS_SESSION_TOKEN
            }
        },
        disableOffline: true
    });

    const player = event.identity.username;

    //1. Check if the token already exists and has the logged in user as the owner
    const tokenRes = await graphqlClient.query({
        query: getExpoToken,
        variables: {
            token: event.arguments.token
        }
    });
    const tokenObj = tokenRes.data.getExpoToken;
    if (tokenObj) {
        if (tokenObj.playerUsername === player) {
            return tokenObj;
        } else {
            //2. If the token exists but it belongs to another user, update the token.
            const updateTokenRes = await graphqlClient.mutate({
                mutation: updateExpoToken,
                variables: {
                    id: tokenObj.id,
                    token: tokenObj.token,
                    playerUsername: player
                }
            });
            return updateTokenRes.data.updateExpoToken;
        }
    } else {
        //3. If the token does not exist, create a new token.
        const createTokenRes = await graphqlClient.mutate({
            mutation: createExpoToken,
            variables: {
                token: event.arguments.token,
                playerUsername: player
            }
        });
        return createTokenRes.data.createExpoToken;
    }
};
