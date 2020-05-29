import httpClient from './httpClient';

class AuthService {
  static signUp = (user) => httpClient.post('/users', { user });

  static signIn = (credentials) =>
    httpClient.post('/users/sign_in', { user: credentials });

  static signOut = () => httpClient.delete('/users/sign_out');

  static getVerificationCode = (email) =>
    httpClient.post('/users/password', { email });

  static updatePassword = (password) =>
    httpClient.patch('/users/password', { password });

  static updateUser = (user) => httpClient.patch('/users', { user });

  static verifyToken = (token) =>
    httpClient.get(`users/password/edit?reset_password_token=${token}`);

  static resetPassword = (password, resetPasswordToken) =>
    httpClient.put('/users/password', { password, resetPasswordToken });
}

export default AuthService;
