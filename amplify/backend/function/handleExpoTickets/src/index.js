/* Amplify Params - DO NOT EDIT
	API_TICTACTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_TICTACTOE_GRAPHQLAPIIDOUTPUT
	API_TICTACTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const appsync = require("aws-appsync");
const gql = require("graphql-tag");
const { Expo } = require("expo-server-sdk");
require("cross-fetch/polyfill");

const ticketsQuery = gql`
    query listExpoTicketsObjects {
        listExpoTicketsObjects {
            items {
                tickets
                id
                createdAt
            }
        }
    }
`;

const deleteExpoToken = gql`
    mutation deleteExpoToken($token: String!) {
        deleteExpoToken(input: { token: $token }) {
            token
        }
    }
`;

const deleteExpoTicketsObject = gql`
    mutation deleteExpoTicketsObject($id: ID!) {
        deleteExpoTicketsObject(input: { id: $id }) {
            id
        }
    }
`;

exports.handler = async event => {
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: process.env.API_TICTACTOE_GRAPHQLAPIENDPOINTOUTPUT,
        // url: "http://192.168.1.101:20002/graphql",
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

    const ticketsRes = await graphqlClient.query({
        query: ticketsQuery
    });
    const ticketsObjects = ticketsRes.data.listExpoTicketsObjects.items;
    for (const ticketsObject of ticketsObjects) {
        const currentDate = new Date();
        const ticketsObjectDate = new Date(ticketsObject.createdAt);
        const timeDiff = (currentDate.getTime() - ticketsObjectDate.getTime()) / (1000 * 60 * 60);
        if (timeDiff < 1) {
            continue;
        }

        const tickets = JSON.parse(ticketsObject.tickets);
        const expo = new Expo();
        const receiptIdChunks = expo.chunkPushNotificationReceiptIds(Object.keys(tickets));

        for (const chunk of receiptIdChunks) {
            try {
                const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                for (let receiptId in receipts) {
                    const { status, details } = receipts[receiptId];
                    if (status === "error") {
                        if (details && details.error && details.error === "DeviceNotRegistered") {
                            try {
                                await graphqlClient.mutate({
                                    mutation: deleteExpoToken,
                                    variables: {
                                        token: tickets[receiptId]
                                    }
                                });
                            } catch (error) {
                                //report
                            }
                        }
                    }
                }
            } catch (error) {
                //report
            }
        }
        try {
            await graphqlClient.mutate({
                mutation: deleteExpoTicketsObject,
                variables: {
                    id: ticketsObject.id
                }
            });
        } catch (error) {
            //report
        }
    }
};
