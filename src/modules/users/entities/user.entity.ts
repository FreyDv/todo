import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AccountEntity } from '../../account/entities/account.entity';
import { TodoListEntity } from '../../todo-list/entities/todo-list.entity';

export const aliasUserEntity = 'users';

@Entity(aliasUserEntity)
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  privateField: string;

  @OneToMany(() => TodoListEntity, (todoList) => todoList.user)
  todoList: TodoListEntity[];

  @OneToMany(() => AccountEntity, (account) => account.user)
  account: AccountEntity[];
}
