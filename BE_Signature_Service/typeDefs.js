import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    signatureList: SignatureList!
  }

  type Mutation {
    deleteSignature(fileName: String!): MutationStatusResponse!
  }

  type MutationStatusResponse {
    status: Int
  }

  type SignatureList {
    result: [Signature]
  }

  type Signature {
    file_name: String!
    file_url: String!
  }
`
export default typeDefs
