import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoListEntity } from '../../../../../untitled/todo-list/entities/todo-list.entity';

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
}
