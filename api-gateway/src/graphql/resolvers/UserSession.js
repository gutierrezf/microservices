import UsersService from "#root/adapters/UsersService";

const UserSession = {
  user: userSession => {
    return UsersService.fetchUser({ userId: userSession.userId });
  }
};

export default UserSession;
