import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'https://sandbox-api.timerise.io/v1',
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
