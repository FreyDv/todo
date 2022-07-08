export class WrongCredentialsProvidedException extends Error {
  constructor() {
    super('Wrong credentials provided');
  }
}
