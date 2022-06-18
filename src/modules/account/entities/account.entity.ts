import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

export const aliasUserEntity = 'account';

@Entity(aliasUserEntity)
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
