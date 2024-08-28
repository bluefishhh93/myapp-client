import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-request";
import { env } from "@/env";

const API_URL_GRAPHQL = `${env.NEXT_PUBLIC_API_URL}/graphql`;

export const client = new GraphQLClient(API_URL_GRAPHQL);

export const privateClient = (token: any) => {
    return new GraphQLClient(API_URL_GRAPHQL, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};