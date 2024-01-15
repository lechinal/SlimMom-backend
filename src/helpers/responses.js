const successResponse = (user, token) => {
  return {
    user: {
      email: user.email,
      password: user.password,
      token: token,
    },
  };
};

module.exports = successResponse;
