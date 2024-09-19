//defined user data set -
//defined graphql typedef
//resolvers for -query -mutation
//mutation for creating new user
// started and listed to local 4000 port

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//sample data-set
const users = [
  { id: 0, name: "parrot", age: 20 },
  { id: 1, name: "crow", age: 10 },
  { id: 2, name: "peagon", age: 15 },
];

const typeDefs = `
    type User {
        id: ID!
        name: String!
        age: Int!
    }

    type Mutation {
        createUser(name: String!, age: Int!): User
    }

    type Query {
        users: [User]!
        getUser(id: ID!): User
    }
`;

const resolvers = {
  Query: {
    users: () => users,
    getUser: (parent, args) =>
      users.find((user) => user.id.toString() === args.id),
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = {
        id: users.length + 1,
        name: args.name,
        age: args.age,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server started at ${url}`);
