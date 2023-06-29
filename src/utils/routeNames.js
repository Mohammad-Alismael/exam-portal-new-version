export const routeNames = () => ({
  login: "/",
  signup: "/signup",
  logout: "/logout",
  forgetPassword: "/forgot-password",
  resetPassword: "/reset-password/:reset_token",
  activateEmail: "/activation/:email_token",
  dashBoard: "/courses",
  coursePage: "/courses/:course_id",
  examPage: "/exam/:examId",
  invitationPage: "/invitation",
});
