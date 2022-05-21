import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';

export const aliasTodoListEntity = 'todo-list';

@Entity(aliasTodoListEntity)
export class TodoListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'is-done' })
  isDone: boolean;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user-id' })
  user: UserEntity;
}
