import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

export const aliasAccountEntity = 'account';

@Entity(aliasAccountEntity)
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
