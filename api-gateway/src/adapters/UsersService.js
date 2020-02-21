import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

export default class UsersService {
  static async createUser({ email, password }) {
    return got
      .post(`${USERS_SERVICE_URI}/users`, { json: { email, password } })
      .json();
  }

  static async fetchUser({ userId }) {
    return got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
  }

  static async createUserSession({ email, password }) {
    console;
    return got
      .post(`${USERS_SERVICE_URI}/sessions`, { json: { email, password } })
      .json();
  }

  static async deleteUserSession({ sessionId }) {
    return got.delete(`${USERS_SERVICE_URI}/sessions/${sessionId}`).json();
  }

  static async fetchUserSession({ sessionId }) {
    return got.get(`${USERS_SERVICE_URI}/sessions/${sessionId}`).json();
  }
}
