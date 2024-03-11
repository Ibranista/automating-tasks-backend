import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskDto } from './dtos/task.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(task: TaskDto): Promise<Task> {
    let newTask: Task = new Task();
    Object.assign(newTask, task);
    return this.taskRepository.save(task);
  }

  async update(id: number, task: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, task);
    return this.taskRepository.findOneBy({ id });
  }

  async updateIsComplete(todo: number) {
    await this.taskRepository.update(
      { todo },
      {
        isCompleted: true,
      },
    );
  }

  async delete(id: number): Promise<void> {
    this.taskRepository.delete(id);
  }
}
