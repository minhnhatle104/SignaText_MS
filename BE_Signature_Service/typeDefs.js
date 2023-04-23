import { gql } from 'apollo-server-express'

const typeDefs = gql`
  scalar UploadFile

  type Query {
    signatureList: SignatureList!
  }

  type Mutation {
    deleteSignature(fileName: String!): MutationStatusResponse!
    addSignature(file: UploadFile!): MutationStatusResponse!
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
