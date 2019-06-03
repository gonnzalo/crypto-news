import { expect } from "chai";
import * as userApi from "./api";

describe("mutations", () => {
  let token = null;
  describe("signUp(username: String!, email: String!, password: String!): Token!", () => {
    it("returns token", async () => {
      const result = await userApi.signUp({
        username: "testuser",
        email: "user@test.com",
        password: "testtest"
      });
      const response = result.data;
      token = response.data.signUp.token;
      expect(result.data).to.be.an("object");
      expect(result.data).to.include.any.keys("data", "singUp", "token");
    });
  });
  describe("signIn(login: String!, password: String!): Token!", () => {
    it("returns token", async () => {
      const result = await userApi.signIn({
        login: "testuser",
        password: "testtest"
      });
      expect(result.data).to.be.an("object");
      expect(result.data).to.include.any.keys("data", "singIn", "token");
    });
  });
  describe("likeLink(linkId: ID!, isPositive: Boolean!): Like", () => {
    it("returns Like", async () => {
      const expectedResult = {
        data: {
          likeLink: {
            isPositive: true
          }
        }
      };
      const result = await userApi.likeLink(
        {
          linkId: 1,
          isPositive: true
        },
        token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("createComment(text: String!, linkId: ID!,  isReply: Boolean!): Comment!", () => {
    it("return Comment", async () => {
      const expectedResult = {
        data: {
          createComment: {
            text: "test comment"
          }
        }
      };
      const result = await userApi.createComment(
        {
          linkId: 1,
          text: "test comment",
          isReply: false
        },
        token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("editComment(id: ID!, text: String!): Comment!", () => {
    it("return Comment edit", async () => {
      const expectedResult = {
        data: {
          editComment: {
            text: "edit test comment"
          }
        }
      };
      const result = await userApi.editComment(
        {
          id: 1,
          text: "edit test comment"
        },
        token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe("deleteComment(id: ID!): Comment!", () => {
    it("return -- Comment Delete --", async () => {
      const expectedResult = {
        data: {
          deleteComment: {
            text: "-- Comment Delete --"
          }
        }
      };
      const result = await userApi.deleteComment(
        {
          id: 1
        },
        token
      );
      expect(result.data).to.eql(expectedResult);
    });
  });
});

describe("users", () => {
  describe("user(id: String!): User", () => {
    it("returns a user when user can be found", async () => {
      const expectedResult = {
        data: {
          user: {
            id: "1",
            username: "testuser",
            email: "user@test.com"
          }
        }
      };
      const result = await userApi.user({ id: "1" });
      expect(result.data).to.eql(expectedResult);
    });
    it("returns null when user cannot be found", async () => {
      const expectedResult = {
        data: {
          user: null
        }
      };
      const result = await userApi.user({ id: "4200000" });
      expect(result.data).to.eql(expectedResult);
    });
  });
});
