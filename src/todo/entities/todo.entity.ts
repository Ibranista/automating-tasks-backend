import { Task } from '../../task/entities/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.todo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tasks: Task[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isCompleted: boolean;
}
