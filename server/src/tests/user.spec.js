import { expect } from "chai";
import * as userApi from "./api";

describe("mutations", () => {
  describe("signUp(username: String!, email: String!, password: String!): Token!", () => {
    it("returns token", async () => {
      const result = await userApi.signUp({
        username: "testuser",
        email: "user@test.com",
        password: "testtest"
      });
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
