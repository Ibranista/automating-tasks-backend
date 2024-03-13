import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Todo, (todo) => todo.tasks)
  todo: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isCompleted: boolean;
}
