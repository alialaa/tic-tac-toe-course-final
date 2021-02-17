import gql from "graphql-tag";

export const getGame = gql`
    query getGame($id: ID!) {
        getGame(id: $id) {
            id
            status
            owners
            initiator
            turn
            state
            winner
            players {
                items {
                    player {
                        username
                        name
                    }
                }
            }
        }
    }
`;

export const startGame = gql`
    mutation startGame($invitee: String!) {
        startGame(invitee: $invitee) {
            id
        }
    }
`;

export const playMove = gql`
    mutation playMove($game: ID!, $index: Int!) {
        playMove(game: $game, index: $index) {
            id
            status
            turn
            state
            winner
        }
    }
`;
