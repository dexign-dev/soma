import { HttpExceptionWithCode } from '../exception';

export class UserAlreadyExistException extends HttpExceptionWithCode {
  constructor() {
    super('User already exist', 403, 'user_already_exist');
  }
}
