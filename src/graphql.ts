//graphql.js

const { ApolloServer, gql } = require('apollo-server-lambda');

const PhotonModule = require('@generated/photon')

const photonTest = new PhotonModule({
    debug: true,
})



const typeDefs = gql`
    type Query {
      hello: String
    }
 `;

const resolvers = {
    Query: {
        hello: async () => {
            // This is a simple test to see how photon works with graphql in a lambda serverless environment
            // if photonTest.disconnect() is not called when in production with aws lambda the process runs indefinitely / times out
            const users = await photonTest.users()
            photonTest.disconnect()
            return JSON.stringify(users)
        }

    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    })
});

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        methods: 'POST',
        allowHeaders: [
            'Content-Type',
            'Origin',
            'Accept'
        ]
    }
});