import { ApolloServer, gql } from "apollo-server"
import { users, tweets } from "../data/mock.js"

// schema
const typeDefs = gql`
  type User {
    id: ID
    name: String
  }

  type Tweet {
    id: ID
    text: String
    author: User
  }

  type Query {
    tweets: [Tweet]
  }
`

// resolvers
const resolvers = {
  Query: {
    tweets: () => tweets,
  },
  Tweet: {
    author: (tweet) => {
      return users.find(u => u.id === tweet.userId)
    },
  },
}

// server
const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 GraphQL running at ${url}`)
})
