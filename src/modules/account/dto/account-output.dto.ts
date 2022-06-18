import { AccountEntity } from '../entities/account.entity';

export class AccountOutputDto {
  id: number;
  email: string;
  resultAuth: boolean;
  jwt: string;

  static fromAccount(account: AccountEntity): AccountOutputDto {
    return {
      id: account.id,
      email: account.email,
      resultAuth: true,
      jwt: '',
    };
  }
}
