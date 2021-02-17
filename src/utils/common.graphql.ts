import gql from "graphql-tag";

export const onUpdateGameById = gql`
    subscription onUpdateGameById($id: ID!) {
        onUpdateGameById(id: $id) {
            id
            status
            turn
            state
            winner
        }
    }
`;
