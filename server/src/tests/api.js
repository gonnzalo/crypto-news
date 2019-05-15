import axios from "axios";

const API_URL = "http://localhost:8000/graphql";

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
        }
      }
    `,
    variables
  });

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation ($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password){
            token
        }
      }
      `,
    variables
  });

export const signIn = async variables =>
  axios.post(API_URL, {
    query: `
      mutation($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
      
      `,
    variables
  });

export const likeLink = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
    mutation($linkId: ID!, $isPositive: Boolean!) {
      likeLink(linkId: $linkId, isPositive: $isPositive) {
        isPositive
      }
    }
      `,
      variables
    },
    {
      headers: {
        "x-token": token
      }
    }
  );

export const createComment = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation($linkId: ID!, $text: String!) {
        createComment(linkId: $linkId, text: $text) {
          text
        }
      }
      `,
      variables
    },
    {
      headers: {
        "x-token": token
      }
    }
  );

export const editComment = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation($id: ID!, $text: String!) {
        editComment(id: $id, text: $text) {
          text
        }
      }
      `,
      variables
    },
    {
      headers: {
        "x-token": token
      }
    }
  );

export const deleteComment = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation($id: ID!) {
        deleteComment(id: $id)
      }
      `,
      variables
    },
    {
      headers: {
        "x-token": token
      }
    }
  );
