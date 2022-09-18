export const actions = {
  SIGN_IN_USER: "SIGN_IN_USER",
};

export const signIn = (signIn) => ({
  type: actions.SIGN_IN_USER,
  signIn,
});
