import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'DUMMY_URL',
    batchInterval: 10
  }),
  connectToDevTools: true,
  dataIdFromObject: o => o.id,
  queryDeduplication: true
});

export default function createApolloClient() {
  return client;
}
