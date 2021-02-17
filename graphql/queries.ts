/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listPlayers = /* GraphQL */ `
    query ListPlayers(
        $username: String
        $filter: ModelPlayerFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
    ) {
        listPlayers(
            username: $username
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
        ) {
            items {
                id
                cognitoID
                username
                name
                email
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getPlayer = /* GraphQL */ `
    query GetPlayer($username: String!) {
        getPlayer(username: $username) {
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
export const listGames = /* GraphQL */ `
    query ListGames($filter: ModelGameFilterInput, $limit: Int, $nextToken: String) {
        listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
export const getGame = /* GraphQL */ `
    query GetGame($id: ID!) {
        getGame(id: $id) {
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
export const getExpoToken = /* GraphQL */ `
    query GetExpoToken($token: String!) {
        getExpoToken(token: $token) {
            id
            token
            playerUsername
            createdAt
            updatedAt
        }
    }
`;
export const listExpoTokens = /* GraphQL */ `
    query ListExpoTokens(
        $token: String
        $filter: ModelExpoTokenFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
    ) {
        listExpoTokens(
            token: $token
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
        ) {
            items {
                id
                token
                playerUsername
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getExpoTicketsObject = /* GraphQL */ `
    query GetExpoTicketsObject($id: ID!) {
        getExpoTicketsObject(id: $id) {
            id
            tickets
            createdAt
            updatedAt
        }
    }
`;
export const listExpoTicketsObjects = /* GraphQL */ `
    query ListExpoTicketsObjects(
        $filter: ModelExpoTicketsObjectFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listExpoTicketsObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                tickets
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
