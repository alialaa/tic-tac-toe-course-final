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

    const initiator = event.identity.username;
    const invitee = event.arguments.invitee;

    //1. Make sure initiator and invitee exist
    const playerQuery = gql`
        query getPlayer($username: String!) {
            getPlayer(username: $username) {
                id
                tokens {
                    items {
                        token
                    }
                }
            }
        }
    `;

    const initiatorResponse = await graphqlClient.query({
        query: playerQuery,
        variables: {
            username: initiator
        }
    });
    const inviteeResponse = await graphqlClient.query({
        query: playerQuery,
        variables: {
            username: invitee
        }
    });

    if (!initiatorResponse.data.getPlayer || !inviteeResponse.data.getPlayer) {
        console.log("At least 1 player does not exist!");
        throw new Error("At least 1 player does not exist!");
    }

    if (initiatorResponse.data.getPlayer.id === inviteeResponse.data.getPlayer.id) {
        console.log("Initiator cannot invite himself!");
        throw new Error("Initiator cannot invite himself!");
    }

    //2. Creating a new Game
    const gameMutation = gql`
        mutation createGame(
            $status: GameStatus!
            $owners: [String!]!
            $initiator: String!
            $turn: String!
            $state: [Symbol]!
        ) {
            createGame(
                input: {
                    status: $status
                    owners: $owners
                    initiator: $initiator
                    turn: $turn
                    state: $state
                }
            ) {
                id
                state
                status
                turn
                winner
            }
        }
    `;

    const gameResponse = await graphqlClient.mutate({
        mutation: gameMutation,
        variables: {
            status: "REQUESTED",
            owners: [initiator, invitee],
            initiator: initiator,
            turn: Math.random() < 0.5 ? initiator : invitee,
            state: [null, null, null, null, null, null, null, null, null]
        }
    });

    //3. Linking the Game with the players (by creating a playerGame model)
    const playerGameMutation = gql`
        mutation createPlayerGame($gameID: ID!, $playerUsername: String!, $owners: [String!]!) {
            createPlayerGame(
                input: { gameID: $gameID, playerUsername: $playerUsername, owners: $owners }
            ) {
                id
            }
        }
    `;

    const initiatorPlayerGameResponse = await graphqlClient.mutate({
        mutation: playerGameMutation,
        variables: {
            gameID: gameResponse.data.createGame.id,
            playerUsername: initiator,
            owners: [initiator, invitee]
        }
    });
    const inviteePlayerGameResponse = await graphqlClient.mutate({
        mutation: playerGameMutation,
        variables: {
            gameID: gameResponse.data.createGame.id,
            playerUsername: invitee,
            owners: [initiator, invitee]
        }
    });

    //4. Send a push notification to the invitee
    const inviteeTokens = inviteeResponse.data.getPlayer.tokens.items;
    const expo = new Expo();
    const messages = [];
    for (let pushToken of inviteeTokens) {
        if (!Expo.isExpoPushToken(pushToken.token)) {
            continue;
        }
        messages.push({
            to: pushToken.token,
            sound: "default",
            body: `${initiator} invited you to play a game!`,
            data: { gameId: gameResponse.data.createGame.id },
            badge: 1
        });
    }
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (let chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            for (let index = 0; index < ticketChunk.length; index++) {
                const ticket = ticketChunk[index];
                const expoToken = chunk[index].to;
                tickets.push({
                    expoToken,
                    ticket
                });
            }
        } catch (error) {
            //report
        }
    }

    const ticketIds = {};
    for (let ticketObj of tickets) {
        const ticket = ticketObj.ticket;
        const expoToken = ticketObj.expoToken;
        if (ticket.status === "error") {
            if (
                ticket.details &&
                ticket.details.error &&
                ticket.details.error === "DeviceNotRegistered"
            ) {
                const deleteExpoToken = gql`
                    mutation deleteExpoToken($token: String!) {
                        deleteExpoToken(input: { token: $token }) {
                            token
                        }
                    }
                `;
                try {
                    await graphqlClient.mutate({
                        mutation: deleteExpoToken,
                        variables: {
                            token: expoToken
                        }
                    });
                } catch (error) {
                    //report
                }
            }
        }
        if (ticket.id) {
            ticketIds[ticket.id] = expoToken;
        }
    }

    if (Object.keys(ticketIds).length !== 0) {
        const createExpoTicketsObject = gql`
            mutation createExpoTicketsObject($tickets: AWSJSON!) {
                createExpoTicketsObject(input: { tickets: $tickets }) {
                    id
                    tickets
                }
            }
        `;
        try {
            await graphqlClient.mutate({
                mutation: createExpoTicketsObject,
                variables: {
                    tickets: JSON.stringify(ticketIds)
                }
            });
        } catch (error) {
            //report
        }
    }

    return {
        id: gameResponse.data.createGame.id,
        status: gameResponse.data.createGame.status,
        turn: gameResponse.data.createGame.turn,
        state: gameResponse.data.createGame.state,
        winner: gameResponse.data.createGame.winner
    };
};
