import { Map, List, OrderedMap } from 'immutable';

const dataBaseInit = async ({ dataState, initState }) => {
    if (!dataState.loading) {
        await dataState;
        return dataState;
    }
    return 'asfa';
};

export default dataBaseInit;


// type whatAreHuman {
//     academy: [Artical!]!
//     plaza: [Speech!]!
//     userInfo: UserInfo!
// }

// type Artical {
//     order: Int!
//     text: String!
//     share: Int!
//     like: Int!
//     revise: String!
//     comment: [Comment!]
// }

// type Speech {
//     id: String
//     plazaName: String
//     userName: String
//     title: String
//     content: String
//     gender: String
//     time: String
//     share: Int
//     collect: Int
//     discuss: [ReviewBlock!]
// }

// type UserInfo {
//     userName: String!
//     gender: String!
//     phoneNumber: Int!,
//     passward: String!,
//     time: String!
//     quantum: String!
//     start: String!
//     end: String!
// }
// type Comment {
//     userName: String!
//     gender: String
//     content: String!
//     time: String!
//     id: String!
//     title: String
//     recomment: [Recomment!]
// }

// type Recomment {
//     userName: String!
//     gender: String!
//     content: String!
//     time: String!
//     id: String!
// }

// type ReviewBlock {
//     time: String!
//     review: [Review!]!
// }

// type Review {
//     userName: String!
//     gender: String!
//     to: String!
//     text: String!
//     time: String!
// }