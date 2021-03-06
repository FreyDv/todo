import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';
import { AuthProvider } from '../enums/auth-provider.enum';

export const aliasAccountEntity = 'account';

@Entity(aliasAccountEntity)
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  type: AuthProvider;

  @Column({ nullable: false, default: false })
  verified: boolean;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => UserEntity, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
