import { gql } from "@apollo/client";

export const DELETE_MULTI_IMAGE = gql`
mutation MyMutation($id: [Int]!) {
    delete_images(imageIds: $id) {
      message
      success
    }
  }
`;
