import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Todo } from '../todo/entities/todo.entity';
import { TaskDto } from './dtos/task.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import axios from 'axios';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    return task;
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

  async updateCheckListTrelloId(todoId: number, IdCard: string) {
    let checkListId = null;
    const todoById = await this.todoRepository.find({
      where: { id: todoId },
      relations: ['tasks'],
    });
    const tasks = todoById[0].tasks;
    // create a checklist in trello
    await axios
      .post('https://api.trello.com/1/checklists', {
        key: 'c692be5f870d73e81f2224a02fef9dcc',
        token:
          'ATTA7ecdeb8b42b161f0e209dd835c6e39b1b1c8a50060dacd6d592888590420f9a1527DC09D',
        name: 'Checklist',
        idCard: IdCard,
      })
      .then((response) => (checkListId = response.data.id));

    // create checklist items on trello
    await Promise.all(
      tasks.map(async (task) => {
        await axios.post(
          'https://api.trello.com/1/checklist/' + checkListId + '/checkItems',
          {
            key: 'c692be5f870d73e81f2224a02fef9dcc',
            token:
              'ATTA7ecdeb8b42b161f0e209dd835c6e39b1b1c8a50060dacd6d592888590420f9a1527DC09D',
            name: task.name,
          },
        );
      }),
    );
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
