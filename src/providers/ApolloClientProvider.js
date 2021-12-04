import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const ApolloClientProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pokemons: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0} }) {
                console.log(existing);
                console.log(incoming);
                const merged = existing ? {...existing} : incoming;
                if (existing) {
                  let resultTemp = [...merged.results]
                  for (let i = 0; i <= incoming.results.length; ++i) {
                    resultTemp[offset+i] = incoming.results[i];
                  }
                  merged.results = resultTemp;
                }
                return merged;
              }
            }
          }
        }
      }
    })
  })

  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export default ApolloClientProvider;