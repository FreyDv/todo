import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

export const aliasUserEntity = 'auth';

@Entity(aliasUserEntity)
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
