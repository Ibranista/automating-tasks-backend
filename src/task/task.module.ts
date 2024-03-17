import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Todo } from 'src/todo/entities/todo.entity';

@Module({
  exports: [TaskService, TypeOrmModule.forFeature([Task])],
  imports: [TypeOrmModule.forFeature([Task, Todo])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
