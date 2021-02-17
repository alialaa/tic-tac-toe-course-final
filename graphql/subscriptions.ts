/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateGameById = /* GraphQL */ `
    subscription OnUpdateGameById($id: ID!) {
        onUpdateGameById(id: $id) {
            id
            status
            owners
            initiator
            turn
            state
            winner
            createdAt
            updatedAt
            players {
                nextToken
            }
        }
    }
`;
export const onCreatePlayer = /* GraphQL */ `
    subscription OnCreatePlayer {
        onCreatePlayer {
            id
            cognitoID
            username
            name
            email
            createdAt
            updatedAt
            games {
                nextToken
            }
            tokens {
                nextToken
            }
        }
    }
`;
export const onUpdatePlayer = /* GraphQL */ `
    subscription OnUpdatePlayer {
        onUpdatePlayer {
            id
            cognitoID
            username
            name
            email
            createdAt
            updatedAt
            games {
                nextToken
            }
            tokens {
                nextToken
            }
        }
    }
`;
export const onDeletePlayer = /* GraphQL */ `
    subscription OnDeletePlayer {
        onDeletePlayer {
            id
            cognitoID
            username
            name
            email
            createdAt
            updatedAt
            games {
                nextToken
            }
            tokens {
                nextToken
            }
        }
    }
`;
export const onCreatePlayerGame = /* GraphQL */ `
    subscription OnCreatePlayerGame {
        onCreatePlayerGame {
            id
            createdAt
            gameID
            playerUsername
            owners
            updatedAt
            player {
                id
                cognitoID
                username
                name
                email
                createdAt
                updatedAt
            }
            game {
                id
                status
                owners
                initiator
                turn
                state
                winner
                createdAt
                updatedAt
            }
        }
    }
`;
export const onUpdatePlayerGame = /* GraphQL */ `
    subscription OnUpdatePlayerGame {
        onUpdatePlayerGame {
            id
            createdAt
            gameID
            playerUsername
            owners
            updatedAt
            player {
                id
                cognitoID
                username
                name
                email
                createdAt
                updatedAt
            }
            game {
                id
                status
                owners
                initiator
                turn
                state
                winner
                createdAt
                updatedAt
            }
        }
    }
`;
export const onDeletePlayerGame = /* GraphQL */ `
    subscription OnDeletePlayerGame {
        onDeletePlayerGame {
            id
            createdAt
            gameID
            playerUsername
            owners
            updatedAt
            player {
                id
                cognitoID
                username
                name
                email
                createdAt
                updatedAt
            }
            game {
                id
                status
                owners
                initiator
                turn
                state
                winner
                createdAt
                updatedAt
            }
        }
    }
`;
export const onCreateGame = /* GraphQL */ `
    subscription OnCreateGame($owners: String) {
        onCreateGame(owners: $owners) {
            id
            status
            owners
            initiator
            turn
            state
            winner
            createdAt
            updatedAt
            players {
                nextToken
            }
        }
    }
`;
export const onUpdateGame = /* GraphQL */ `
    subscription OnUpdateGame($owners: String) {
        onUpdateGame(owners: $owners) {
            id
            status
            owners
            initiator
            turn
            state
            winner
            createdAt
            updatedAt
            players {
                nextToken
            }
        }
    }
`;
export const onDeleteGame = /* GraphQL */ `
    subscription OnDeleteGame($owners: String) {
        onDeleteGame(owners: $owners) {
            id
            status
            owners
            initiator
            turn
            state
            winner
            createdAt
            updatedAt
            players {
                nextToken
            }
        }
    }
`;
export const onCreateExpoToken = /* GraphQL */ `
    subscription OnCreateExpoToken($playerUsername: String) {
        onCreateExpoToken(playerUsername: $playerUsername) {
            id
            token
            playerUsername
            createdAt
            updatedAt
        }
    }
`;
export const onUpdateExpoToken = /* GraphQL */ `
    subscription OnUpdateExpoToken($playerUsername: String) {
        onUpdateExpoToken(playerUsername: $playerUsername) {
            id
            token
            playerUsername
            createdAt
            updatedAt
        }
    }
`;
export const onDeleteExpoToken = /* GraphQL */ `
    subscription OnDeleteExpoToken($playerUsername: String) {
        onDeleteExpoToken(playerUsername: $playerUsername) {
            id
            token
            playerUsername
            createdAt
            updatedAt
        }
    }
`;
export const onCreateExpoTicketsObject = /* GraphQL */ `
    subscription OnCreateExpoTicketsObject {
        onCreateExpoTicketsObject {
            id
            tickets
            createdAt
            updatedAt
        }
    }
`;
export const onUpdateExpoTicketsObject = /* GraphQL */ `
    subscription OnUpdateExpoTicketsObject {
        onUpdateExpoTicketsObject {
            id
            tickets
            createdAt
            updatedAt
        }
    }
`;
export const onDeleteExpoTicketsObject = /* GraphQL */ `
    subscription OnDeleteExpoTicketsObject {
        onDeleteExpoTicketsObject {
            id
            tickets
            createdAt
            updatedAt
        }
    }
`;
