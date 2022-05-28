import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  // userId: UserEntity; // Я хочу через JoinColumn получать только id user к которому привязанна тудушка а не целяком всего юзера как сделать я не нашел!
  userId: number; // То что я тупо сделал его number  я подозреваю что ни чего не даст в итоге!
}
